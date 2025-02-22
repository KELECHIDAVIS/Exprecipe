package com.exprecipe.backend.ingredient;

import com.exprecipe.backend.user.User;
import com.exprecipe.backend.user.UserRepo;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.WriteChannel;
import com.google.cloud.storage.*;
import com.google.cloud.vertexai.VertexAI;
import com.google.cloud.vertexai.api.GenerateContentResponse;
import com.google.cloud.vertexai.generativeai.ContentMaker;
import com.google.cloud.vertexai.generativeai.GenerativeModel;
import com.google.cloud.vertexai.generativeai.PartMaker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.ByteBuffer;
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


    public ResponseEntity<List<Ingredient>> getUserIngredients(Integer userId) {

        return ResponseEntity.ok(ingredientRepo.findIngredientsByUser_Id(userId));
    }





    // searches api based on inputted ingredient name and return's a list of spoonac ingrs to choose from
    // number is the amount of ingredients return
    public SpoonacularIngredient[] ingredientSearch(String search, int number) {

        String apiURL = "https://api.spoonacular.com/food/ingredients/autocomplete?apiKey="+apiKey+"&query="+search+"&number="+number+"&metaInformation=true";
        RestTemplate restTemplate = new RestTemplate();

        try{
            ResponseEntity<SpoonacularIngredient[]> list=  restTemplate.getForEntity(apiURL,SpoonacularIngredient[].class );

            return list.getBody();
        }catch(Exception e){
            return new SpoonacularIngredient[0];
        }
    };

    // Using the ingredient name, make a request to external api and get corresponding ingredient
    public ResponseEntity<Ingredient> addIngredient(Integer userId, SpoonacularIngredient spIngredient) {

        Optional<User> userOpt = userRepo.findById(userId);

        // if user is present save ingredient
        if(userOpt.isPresent()){
           // map sp ingr to our type
           Ingredient ingr = new Ingredient();
           ingr.setUser(userOpt.get());
           ingr.setName(spIngredient.getName());
           ingr.setPossibleUnits(spIngredient.getPossibleUnits());
           ingr.setSpID(spIngredient.getId());
           ingr.setImageURL("https://img.spoonacular.com/ingredients_100x100/"+spIngredient.getImage()); //extension for ingredients

            ingredientRepo.save(ingr);
            return ResponseEntity.ok(ingr);
        }

        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(null);
    }

    public ResponseEntity<String> deleteIngredient(int ingrId) {
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
    public ResponseEntity<Ingredient> updateIngredientAmount(int ingrId, int amount) {
        Optional<Ingredient> possibleIngr = ingredientRepo.findById(ingrId);

        if(possibleIngr.isPresent()) {
            Ingredient ingredient = possibleIngr.get();
            ingredient.setAmount(amount);
            ingredientRepo.save(ingredient);
            return ResponseEntity.ok(ingredient);
        }
        return ResponseEntity.badRequest().build();
    }

    public ResponseEntity<Ingredient> updateIngredientUnit(int ingrId, String unit) {
        Optional<Ingredient> possibleIngr = ingredientRepo.findById(ingrId);

        if(possibleIngr.isPresent()) {
            Ingredient ingredient = possibleIngr.get();
            ingredient.setUnit(unit);
            ingredientRepo.save(ingredient);
            return ResponseEntity.ok(ingredient);
        }
        return ResponseEntity.badRequest().build();
    }

    public ResponseEntity<Ingredient> updateIngredientPossibleUnits(int ingrId, List<String> possibleUnits) {
        Optional<Ingredient> possibleIngr = ingredientRepo.findById(ingrId);

        if(possibleIngr.isPresent()) {
            Ingredient ingredient = possibleIngr.get();
            ingredient.setPossibleUnits(possibleUnits);
            ingredientRepo.save(ingredient);
            return ResponseEntity.ok(ingredient);
        }
        return ResponseEntity.badRequest().build();
    }

    public String detectIngredientsInImage(MultipartFile imageFile) throws IOException {
        return scanImage(imageFile) ;
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

            GenerativeModel model = new GenerativeModel(modelName, vertexAI);
            GenerateContentResponse response = model.generateContent(ContentMaker.fromMultiModalData(
                    PartMaker.fromMimeTypeAndData("image/png", cloudStorageUri),
                    "Return all the unique ingredients you can detect in this image as a comma separated list. Avoid using special and escape characters. Avoid saying anything other than the list"
                    ));

            return response.toString();
        }
    }
}
