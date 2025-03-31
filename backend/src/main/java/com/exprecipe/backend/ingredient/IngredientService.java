package com.exprecipe.backend.ingredient;

import com.exprecipe.backend.user.User;
import com.exprecipe.backend.user.UserRepo;
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
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class IngredientService {
    private final IngredientRepo ingredientRepo;
    private final UserRepo userRepo;

    @Value("${bucket.name}")
    private String bucketName;
    @Value("${ggl.project.id}")
    private String projectId;
    @Value("${api.key}")
    private String apiKey;

    @Autowired
    public IngredientService(IngredientRepo ingredientRepo, UserRepo userRepo) {
        this.ingredientRepo = ingredientRepo;
        this.userRepo = userRepo;
    }


    public ResponseEntity<List<Ingredient>> getUserIngredients(Long userId) {

        return ResponseEntity.ok(ingredientRepo.findIngredientsByUser_Id(userId));
    }





    // searches api based on inputted ingredient name and return's a list of spoonac ingrs to choose from
    // number is the amount of ingredients return
    public ResponseEntity<SpoonacularIngredient[]> ingredientSearch(String search, int number) {

        String apiURL = "https://api.spoonacular.com/food/ingredients/autocomplete?apiKey="+apiKey+"&query="+search+"&number="+number+"&metaInformation=true";
        RestTemplate restTemplate = new RestTemplate();

        try{
            ResponseEntity<SpoonacularIngredient[]> list=  restTemplate.getForEntity(apiURL,SpoonacularIngredient[].class );

            return ResponseEntity.ok().body(list.getBody());
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new SpoonacularIngredient[0]);
        }
    };

    // Using the ingredient name, make a request to external api and get corresponding ingredient
    public ResponseEntity<Ingredient> addIngredient(Long userId, SpoonacularIngredient spIngredient) {

        Optional<User> userOpt = userRepo.findById(userId);

        // if user is present save ingredient
        if(userOpt.isPresent()){

           // map sp ingr to our type
            Ingredient ingr = saveSpoonacularIngredient(spIngredient , userOpt.get());
            return ResponseEntity.ok(ingr);
        }

        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(null);
    }

    //translates spIngr to our version then saves to db
    public Ingredient saveSpoonacularIngredient(SpoonacularIngredient spIngredient , User user) {
        Ingredient ingr = new Ingredient();
        ingr.setName(spIngredient.getName());
        ingr.setPossibleUnits(spIngredient.getPossibleUnits());
        ingr.setSpID(spIngredient.getId());

        String imageUrl = spIngredient.getImage().startsWith("http") ?  spIngredient.getImage() : "https://img.spoonacular.com/ingredients_100x100/"+spIngredient.getImage() ;
        ingr.setImage(imageUrl); //extension for ingredients

        ingredientRepo.save(ingr);
        return ingr;
    }


    // adds list of ingredients using list of ingredient names that's returned from the scanned image
    public ResponseEntity<List<Ingredient>> addListOfIngredients(Long userId, List<String> ingrNames) {

        // first check user is valid
        Optional<User> userOpt = userRepo.findById(userId);

        if(userOpt.isPresent()){
            List<Ingredient> detectedIngrs= new ArrayList<>();

            RestTemplate restTemplate = new RestTemplate();
            String apiURL ;
            // for each ingredient
            for(int i =0 ; i<ingrNames.size(); i++){

                // search spoonac for ingr name (use auto complete because it returns amount and unit
                // call add ingredient function with
                // add to list
                apiURL = "https://api.spoonacular.com/food/ingredients/autocomplete?apiKey="+apiKey+"&query="+ingrNames.get(i)+"&number="+1+"&metaInformation=true";

                try{
                    SpoonacularIngredient[] list=  restTemplate.getForObject(apiURL, SpoonacularIngredient[].class); // returns as a list

                    // if there is an ingredient, save to db
                    if(list[0] != null) {
                        Ingredient ingr = saveSpoonacularIngredient(list[0], userOpt.get());
                        detectedIngrs.add(ingr); // add to list
                    }
                }catch(Exception e){
                // if not found just continue onto the next
                }
            }
            return ResponseEntity.ok(detectedIngrs); // return ingredients
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build(); // user doesn't exist
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
    public ResponseEntity<Ingredient> updateIngredientAmount(Long ingrId, int amount) {
        Optional<Ingredient> possibleIngr = ingredientRepo.findById(ingrId);

        if(possibleIngr.isPresent()) {
            Ingredient ingredient = possibleIngr.get();
            ingredient.setAmount(amount);
            ingredientRepo.save(ingredient);
            return ResponseEntity.ok(ingredient);
        }
        return ResponseEntity.badRequest().build();
    }

    public ResponseEntity<Ingredient> updateIngredientUnit(Long ingrId, String unit) {
        Optional<Ingredient> possibleIngr = ingredientRepo.findById(ingrId);

        if(possibleIngr.isPresent()) {
            Ingredient ingredient = possibleIngr.get();
            ingredient.setUnit(unit);
            ingredientRepo.save(ingredient);
            return ResponseEntity.ok(ingredient);
        }
        return ResponseEntity.badRequest().build();
    }

    public ResponseEntity<Ingredient> updateIngredientPossibleUnits(Long ingrId, List<String> possibleUnits) {
        Optional<Ingredient> possibleIngr = ingredientRepo.findById(ingrId);

        if(possibleIngr.isPresent()) {
            Ingredient ingredient = possibleIngr.get();
            ingredient.setPossibleUnits(possibleUnits);
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

        String output = detectIngredients(projectId, "us-central1","gemini-1.5-flash-001", cloudStorageUri);


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
