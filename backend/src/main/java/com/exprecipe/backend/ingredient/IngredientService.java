package com.exprecipe.backend.ingredient;

import com.exprecipe.backend.user.User;
import com.exprecipe.backend.user.UserRepo;
import com.exprecipe.backend.user.userIngr.UserIngredient;
import com.exprecipe.backend.user.userIngr.UserIngredientRepo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.WriteChannel;
import com.google.cloud.storage.*;
import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.api.GenerationConfig;
import com.google.cloud.vertexai.api.Schema;
import com.google.cloud.vertexai.api.Type;
import com.google.cloud.vertexai.generativeai.ContentMaker;
import com.google.cloud.vertexai.generativeai.GenerativeModel;
import com.google.cloud.vertexai.generativeai.PartMaker;
import com.google.cloud.vertexai.generativeai.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.util.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.http.*;
import java.net.URI;
import com.exprecipe.backend.ingredient.IngredientResponse;
@Service
public class IngredientService {
    private final IngredientRepo ingredientRepo;
    private final UserRepo userRepo;
    private final UserIngredientRepo userIngredientRepo;

    @Value("${bucket.name}")
    private String bucketName;
    @Value("${ggl.project.id}")
    private String projectId;
    @Value("${api.key}")
    private String apiKey;

    @Autowired
    public IngredientService(IngredientRepo ingredientRepo, UserRepo userRepo, UserIngredientRepo userIngredientRepo) {
        this.ingredientRepo = ingredientRepo;
        this.userRepo = userRepo;
        this.userIngredientRepo = userIngredientRepo;
    }



    // searches api based on inputted ingredient name and return's a list of spoonac ingrs to choose from
    // returns 3 possible choices
    public ResponseEntity<SpoonacularIngredient[]> ingredientSearch(String search) {
        // first check db to see if it returns the correct amount of ingredients
        List<Ingredient> possibleIngredients = ingredientRepo.findSimilarIngredients(search);

        if(possibleIngredients!=null && possibleIngredients.size()== 3) {
            // translate into spingrs then return
            List<SpoonacularIngredient> ingredients =new ArrayList<SpoonacularIngredient>();

            for (int i = 0; i < possibleIngredients.size(); i++) {
                SpoonacularIngredient sp = new SpoonacularIngredient(
                        possibleIngredients.get(i).getName(),
                        possibleIngredients.get(i).getImage(),
                        possibleIngredients.get(i).getSpID(),
                        possibleIngredients.get(i).getAisle(),
                        possibleIngredients.get(i).getPossibleUnits()
                );

                ingredients.add(sp);
            }
            return ResponseEntity.ok(ingredients.toArray(new SpoonacularIngredient[possibleIngredients.size()]));
        }

        // otherwise call api then save the results

        // call rapid api , return three possible ingredients 
        // rapid api returns in the form of ingredient response, first translate into that 
        HttpRequest request = HttpRequest.newBuilder()
		.uri(URI.create("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/ingredients/search"+
        "?query="+search+
        "&number=3&metaInformation=false&offset=0"))
		.header("x-rapidapi-key",  apiKey)
		.header("x-rapidapi-host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com")
		.method("GET", HttpRequest.BodyPublishers.noBody())
		.build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
        
        if (response.statusCode() != 200 ){
            // failed response 
           return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new SpoonacularIngredient[0]);
        }   
        
        // map response string into ingredient response object
        ObjectMapper objMapper = new ObjectMapper();
        IngredientResponse ingrResponse = null;

        try {
            ingrResponse = objMapper.readValue(response.body(), IngredientResponse.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
            return ResponseEntity.badRequest().body(new SpoonacularIngredient[0]);
        }

        //now for each spoonacular ingredient within the ingr response save into the db so we can retrieve if we ever call again 
        for (SpoonacularIngredient ingr : ingrResponse.getResults()){
            translateAndSaveSpIngredient(ingr)  ; 
        }
        return ResponseEntity.ok(ingrResponse.getResults()); 
    };



    //translates spIngr to our version then saves to db
    public Ingredient translateAndSaveSpIngredient(SpoonacularIngredient spIngredient ) {
        // if ingredient with that name already exists, just return that ingredient
        Optional<Ingredient> ingrOpt = ingredientRepo.findByName(spIngredient.getName());

        if(ingrOpt.isPresent()){ // just return saved ingredient
            return ingrOpt.get();
        }

        Ingredient ingr = new Ingredient();
        ingr.setName(spIngredient.getName());
        ingr.setPossibleUnits(spIngredient.getPossibleUnits());
        ingr.setSpID(spIngredient.getId());
        ingr.setAisle(spIngredient.getAisle());
        String imageUrl = spIngredient.getImage().startsWith("http") ?  spIngredient.getImage() : "https://img.spoonacular.com/ingredients_100x100/"+spIngredient.getImage() ;
        ingr.setImage(imageUrl); //extension for ingredients

        ingredientRepo.save(ingr);
        return ingr;
    }




    public ResponseEntity<String> deleteIngredient(Long ingrId) {
        try {
            ingredientRepo.deleteById(ingrId);
        }catch (EmptyResultDataAccessException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Ingredient With That Id Exists");
        }
        return ResponseEntity.ok().body("Ingredient deleted");
    }

    public ResponseEntity<Ingredient> updateIngredient(Ingredient ingredient) {
        Optional<Ingredient> possibleIngr = ingredientRepo.findById(ingredient.getId());

        if(possibleIngr.isPresent()) {
            ingredientRepo.save(ingredient);
            return ResponseEntity.ok(ingredient);
        }
        return ResponseEntity.badRequest().build();
    }


    public ResponseEntity<String> detectIngredientsInImage(MultipartFile imageFile) throws IOException {
        return ResponseEntity.ok().body(scanImage(imageFile)) ;
    }


    /*
    Returns list of ingredients names detected within image
     */
    public  String scanImage(MultipartFile file) throws IOException {
        // file name has to be unique to user
        String fileName = UUID.randomUUID().toString().replace("-","") + ".jpg";
        //connect to google cloud storage
        Storage storage = StorageOptions.newBuilder().setCredentials(GoogleCredentials.getApplicationDefault()).build().getService();
        Bucket bucket = storage.get(bucketName) ;

        // Upload blob to bucket
        BlobId blobId = BlobId.of(bucketName, fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).build();
        Blob blob = storage.create(blobInfo);

        try(WriteChannel channel = blob.writer()){
            channel.write(ByteBuffer.wrap(file.getBytes()));
        }

        //Configure are uri so the model can detect
        String cloudStorageUri = "gs://" + bucketName + "/" + fileName;

        String output = detectIngredients(projectId, "us-central1","gemini-2.0-flash-lite", cloudStorageUri);


        // now try to delete it from the bucket after ingredients are detected

        deleteImageFromBucket(fileName, cloudStorageUri);
        return output;
    }

    private void deleteImageFromBucket(String fileName, String cloudStorageUri) {
        try {
            // 1. Extract bucket name and file path from the URI
            String[] parts = cloudStorageUri.substring("gs://".length()).split("/", 2);
            String bucketName = parts[0];
            String filePath = parts[1];

            // 2. Delete the blob (file)
            Storage storage = StorageOptions.newBuilder().setCredentials(GoogleCredentials.getApplicationDefault()).build().getService();
            BlobId blobId = BlobId.of(bucketName, filePath);
            boolean deleted = storage.delete(blobId);

            if (!deleted) {
                System.out.println("Image not found or could not be deleted: " + cloudStorageUri);
            }

        } catch (Exception e) {
            System.err.println("Error deleting image: " + e.getMessage());
        }
    }

    //Uses gemini model to detect ingredients in the image
    private String detectIngredients( String projectId, String location, String modelName, String cloudStorageUri) throws IOException {
        // Initialize client that will be used to send requests. This client only needs
        // to be created once, and can be reused for multiple requests.
        try (VertexAI vertexAI = new VertexAI(projectId, location)) {
            // response will be in a json list of strings
            GenerationConfig generationConfig = GenerationConfig.newBuilder()
                    .setResponseMimeType("application/json")
                    .setResponseSchema(Schema.newBuilder()
                            .setType(Type.ARRAY)
                            .setItems(Schema.newBuilder()
                                    .setType(Type.STRING)
                                    .build())
                            .build()
                    )
                    .build();

            // generate model
            GenerativeModel model = new GenerativeModel(modelName, vertexAI)
                    .withGenerationConfig(generationConfig);


            GenerateContentResponse response = model.generateContent(ContentMaker.fromMultiModalData(
                    PartMaker.fromMimeTypeAndData("image/png", cloudStorageUri),
                    "Return a list of all the ingredients you can detect within this image. Use generic names when referring to the ingredients.\n"
                    ));

            String output = ResponseHandler.getText(response);

            return output;
        }
    }
}
