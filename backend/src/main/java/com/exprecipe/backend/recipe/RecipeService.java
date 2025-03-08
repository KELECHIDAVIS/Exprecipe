package com.exprecipe.backend.recipe;

import com.exprecipe.backend.ingredient.Ingredient;
import com.exprecipe.backend.ingredient.IngredientRepo;
import com.exprecipe.backend.user.User;
import com.exprecipe.backend.user.UserRepo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeService {
    private final RecipeRepo recipeRepo;
    private final IngredientRepo ingredientRepo; // to get possible Recipes
    private final UserRepo userRepo; // get recipes associated w/ users

    @Value("${api.key}")
    private String apiKey;

    public RecipeService(RecipeRepo recipeRepo, IngredientRepo ingredientRepo, UserRepo userRepo) {
        this.recipeRepo = recipeRepo;
        this.ingredientRepo = ingredientRepo;
        this.userRepo = userRepo;
    }

    public ResponseEntity<List<Recipe>> getUserRecipes(int userId) {
        return ResponseEntity.ok(recipeRepo.findRecipesByUser_Id(userId));
    }

    public ResponseEntity<Recipe> saveRecipe(int userId, Recipe recipe) {
        //first make sure associated user exist
        Optional<User> possibleUser = userRepo.findById(userId);
        // save if user exists
        if(possibleUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(recipeRepo.save(recipe));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    public ResponseEntity<String> deleteRecipe(int recipeId) {
        try{
            recipeRepo.deleteById(recipeId);
        }catch(EmptyResultDataAccessException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Recipe With That Id Exists");
        }
        return ResponseEntity.ok().body("Recipe deleted");
    }

    /*
    This functions will get the user's possible recipes based on their ingredients
    -validate user exists
    -retrieve their ingredients through repo
    -format list of ingredients for external api
    -call external api
    -return results as list of OBJECTS
    (reason for list of objs so we don't have to waste time formatting into Recipes)
     */
    /*
    @params:
    numberOfRecipes: the max number of recipes returned by external api; between 1-100
    ranking: either 1 or 2: (1) returns recipes that use the most amt of our ingrs, (2) minimizes missing ingrs
    ignorePantry: if true it assumes you have common household ingredients like salt, flour, etc. false will just go off of inputted ingredients
     */
    public ResponseEntity<String> getPossibleRecipes (int userId, int numberOfRecipes, int ranking, boolean ignorePantry ) {
        Optional<User> possibleUser = userRepo.findById(userId);
        if(possibleUser.isPresent()) {
            List<Ingredient> ingrList = ingredientRepo.findIngredientsByUser_Id(userId);

            /*
            format ingrs for api
            it expects them as comma seperated string; Ex: "apples,flour,sugar"
             */
            String formattedIngredients = formatIngredientList(ingrList);

            // api request

            String apiURL = "https://api.spoonacular.com/recipes/findByIngredients?apiKey="+apiKey+"&ingredients="+formattedIngredients+"&number="+numberOfRecipes+"&ranking="+ranking+"&ignorePantry="+ignorePantry;
            RestTemplate restTemplate = new RestTemplate();
            String responseEntity = restTemplate.getForObject(apiURL, String.class);

            System.out.println(responseEntity);

            return ResponseEntity.status(HttpStatus.OK).body(responseEntity);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    /*
    Formats our ingredients list into external api's format
     */
    private String formatIngredientList(List<Ingredient> ingrList) {
        String formattedIngredients = "";
        for(int i = 0 ; i < ingrList.size() ; i++) {
            formattedIngredients+= ingrList.get(i).getName();

            if(i != ingrList.size() - 1) {
                formattedIngredients+=",";
            }
        }
        return formattedIngredients;
    }

    // makes a request to the external api to retreive recipe information
    public ResponseEntity<String> getRecipeInformation(Integer userId, Integer recipeId) {
        Optional<User> possibleUser = userRepo.findById(userId);
        if(possibleUser.isPresent()) {
            String apiUrl = "https://api.spoonacular.com/recipes/" + recipeId + "/information?apiKey=" + apiKey;

            RestTemplate restTemplate = new RestTemplate();
            String responseEntity = restTemplate.getForObject(apiUrl, String.class);

            return ResponseEntity.status(HttpStatus.OK).body(responseEntity);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
