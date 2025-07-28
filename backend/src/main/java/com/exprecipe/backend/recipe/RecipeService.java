package com.exprecipe.backend.recipe;

import com.exprecipe.backend.ingredient.Ingredient;
import com.exprecipe.backend.ingredient.IngredientRepo;
import com.exprecipe.backend.ingredient.IngredientResponse;
import com.exprecipe.backend.ingredient.SpoonacularIngredient;
import com.exprecipe.backend.user.User;
import com.exprecipe.backend.user.UserRepo;
import com.exprecipe.backend.user.userIngr.UserIngredient;
import com.exprecipe.backend.user.userIngr.UserIngredientRepo;
import com.exprecipe.backend.user.userrecipe.UserRecipe;
import com.exprecipe.backend.user.userrecipe.UserRecipeRepo;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpHeaders;

import java.io.IOException;
import java.net.http.*;
import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class RecipeService {
    @Autowired
    private final RecipeRepo recipeRepo;
    @Autowired
    private final IngredientRepo ingredientRepo; // to get possible Recipes
    private final UserRepo userRepo; // get recipes associated w/ users
    private final RecipeIngredientRepo recipeIngredientRepo;
    private final UserRecipeRepo userRecipeRepo;

    @Value("${api.key}")
    private String apiKey;
    @Autowired
    private UserIngredientRepo userIngredientRepo;

    public RecipeService(RecipeRepo recipeRepo, IngredientRepo ingredientRepo, UserRepo userRepo, RecipeIngredientRepo recipeIngredientRepo, UserRecipeRepo userRecipeRepo) {
        this.recipeRepo = recipeRepo;
        this.ingredientRepo = ingredientRepo;
        this.userRepo = userRepo;
        this.recipeIngredientRepo = recipeIngredientRepo;
        this.userRecipeRepo = userRecipeRepo;
    }

    @Transactional
    public ResponseEntity<Set<UserRecipe>> getUserRecipes(Long userId) {
        return ResponseEntity.ok(userRecipeRepo.findByUser_Id(userId));
    }


    // Saves spoonacular recipe to db and saves user recipe
    @Transactional
    public ResponseEntity<Recipe> saveRecipe(Long userId, SpoonacularRecipe spRecipe) {
        //first make sure associated user exist
        Optional<User> possibleUser = userRepo.findById(userId);
        // save if user exists
        if(possibleUser.isPresent()) {

            // if the recipe is alr saved just return that to user
            Optional<Recipe> recipeOpt= recipeRepo.findByTitle(spRecipe.getTitle());

            Recipe recipe = null;

            if(!recipeOpt.isPresent()) {
                recipe = translateAndSaveSpRecipe(spRecipe);
            }else{
                recipe = recipeOpt.get();
            }

            // set user recipe's recipe and user
            UserRecipe userRecipe = new UserRecipe();
            userRecipe.setRecipe(recipe);
            userRecipe.setUser(possibleUser.get());
            userRecipeRepo.save(userRecipe);

            return ResponseEntity.status(HttpStatus.CREATED).body(recipe);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    //Translates and saves sp recipe as well as their ingredients
    private Recipe translateAndSaveSpRecipe(SpoonacularRecipe spRecipe) {
        Recipe recipe = new Recipe();
        recipe.setServings(spRecipe.getServings());
        recipe.setReadyInMinutes(spRecipe.getReadyInMinutes());
        recipe.setCookingMinutes(spRecipe.getCookingMinutes());
        recipe.setPreparationMinutes(spRecipe.getPreparationMinutes());
        recipe.setSpID(spRecipe.getId());
        recipe.setSpoonacularSourceUrl(spRecipe.getSpoonacularSourceUrl());
        recipe.setSourceUrl(spRecipe.getSourceUrl());
        recipe.setPreparationMinutes(spRecipe.getPreparationMinutes());
        recipe.setInstructions(spRecipe.getInstructions());
        recipe.setImage(spRecipe.getImage());
        recipe.setDishTypes(recipe.getDishTypes());
        recipe.setCuisines(recipe.getCuisines());
        recipe.setTitle(spRecipe.getTitle());

        recipeRepo.save(recipe); // save recipe

        // translate the ingredient to our ingredients
        // set ingredient's recipe and user

        // for each recipe's ingr, if ingr alr exist reference it if not save then reference
        for(SpRecipeIngredient spIngr : spRecipe.getExtendedIngredients()) {

            Optional<Ingredient> ingrOpt = ingredientRepo.findByName(spIngr.getName());
            Ingredient ingr = null;

            if(!ingrOpt.isPresent()) {
                ingr = new Ingredient();
                ingr.setName(spIngr.getName());
                ingr.setAisle(spIngr.getAisle());
                String image = spIngr.getImage().startsWith("http") ? spIngr.getImage() : "https://img.spoonacular.com/ingredients_100x100/" + spIngr.getImage();
                ingr.setImage(spIngr.getImage());
                ingr.setSpID(spIngr.getId());

                ingredientRepo.save(ingr); // save ingr
            }else{
                ingr = ingrOpt.get();
            }


            // create recipe ingr that references the ingr
            RecipeIngredient recipeIngr = new RecipeIngredient();
            recipeIngr.setIngredient(ingr);
            recipeIngr.setRecipe(recipe);
            recipeIngr.setAmount(spIngr.getAmount());
            recipeIngr.setUnit(spIngr.getUnit());

            recipeIngredientRepo.save(recipeIngr);

        }
        return recipe;
    }


    public ResponseEntity<String> deleteUserRecipe(Long recipeId) {
        try{
            userRecipeRepo.deleteById(recipeId);
        }catch(EmptyResultDataAccessException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No User Recipe With That Id Exists");
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
    public ResponseEntity<List<RpdRecipeSearchByIngr>> getPossibleRecipes (Long userId, int numberOfRecipes, int ranking, boolean ignorePantry ) {
        Optional<User> possibleUser = userRepo.findById(userId);
        if(possibleUser.isPresent()) {
            Set<UserIngredient> ingrList = userIngredientRepo.findByUser_Id(userId);

            /*
            format ingrs for api
            it expects them as comma seperated string; Ex: "apples,flour,sugar"
             */
            String formattedIngredients = formatIngredientList(ingrList);

            // api request

            String apiURL ="https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients"
            +"?ingredients="+formattedIngredients
            +"&number="+numberOfRecipes
            +"&ranking="+ranking
            +"&ignorePantry="+ignorePantry;

            HttpHeaders headers = new HttpHeaders();
            headers.set("x-rapidapi-key", apiKey);
            headers.set("x-rapidapi-host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com");

            // make get call to rapid api
            try {
                RestTemplate restTemplate = new RestTemplate();
                restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());

                ResponseEntity<List<RpdRecipeSearchByIngr>> response = restTemplate.exchange(
                        apiURL,
                        HttpMethod.GET,
                        new HttpEntity<>(headers),
                        new ParameterizedTypeReference<List<RpdRecipeSearchByIngr>>() {}
                );
                List<RpdRecipeSearchByIngr> recipes = response.getBody();
                return ResponseEntity.ok(recipes);

            }catch(Exception e) {
                e.printStackTrace();
                System.out.println("Error when calling getPossibleRecipes:"+ e.getMessage());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }



        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    /*
    Formats our ingredients list into external api's format
     */
    private String formatIngredientList(Set<UserIngredient> ingrList) {
        String formattedIngredients = "";
        List<UserIngredient> asList = ingrList.stream().toList();
        for(int i = 0 ; i < asList.size() ; i++) {
            formattedIngredients+= asList.get(i).getIngredient().getName();

            if(i != asList.size() - 1) {
                formattedIngredients+=",";
            }
        }
        return formattedIngredients;
    }

    // makes a request to the external api to retreive recipe information
    public ResponseEntity<SpoonacularRecipe> getRecipeInformation(Long userId, Integer recipeSpId) {
        Optional<User> possibleUser = userRepo.findById(userId);
        if(possibleUser.isPresent()) {
            String apiUrl ="https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + recipeSpId + "/information" ;

            HttpHeaders headers = new HttpHeaders();
            headers.set("x-rapidapi-key", apiKey);
            headers.set("x-rapidapi-host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com");

          
         // make get call to rapid api
            try {
                RestTemplate restTemplate = new RestTemplate();
                restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());

                ResponseEntity<SpoonacularRecipe> response = restTemplate.exchange(
                        apiUrl,
                        HttpMethod.GET,
                        new HttpEntity<>(headers),
                        new ParameterizedTypeReference<SpoonacularRecipe>() {}
                );
              SpoonacularRecipe info = response.getBody();
                return ResponseEntity.ok(info);

            }catch(Exception e) {
                e.printStackTrace();
                System.out.println("Error when calling getRecipeInfo:"+ e.getMessage());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }

            
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }



    //THERE IS SOMETHING WEIRD GOING ON WITH THIS REQUEST FOR CERTAIN RECIPE TYPES HAVE TO LOOK INTO MORE
    //MAYBE CHANGE COMPLEX SEARCH INTO QUERY BASED WITH FILTERS (query: burger )
    //for rn using base recipe search from the api   
    public  ResponseEntity<List<RpdRecipeSearchByIngr>> getPossibleRecipesComplex(Long userId, int numberOfRecipes, boolean ignorePantry , String cuisines, String type , int maxReadyTime, int minServings, String sort, String diets, String intolerances) {
        Optional<User> possibleUser = userRepo.findById(userId);

        if(possibleUser.isPresent()) {
            Set<UserIngredient> ingrList = userIngredientRepo.findByUser_Id(userId);

            /*
            format ingrs for api
            it expects them as comma seperated string; Ex: "apples,flour,sugar"
             */
            String formattedIngredients = formatIngredientList(ingrList);

            // format cuisines, diets, intolerances into comma seperated lists
            String apiURL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/searchComplex?"
                    +"includeIngredients="+formattedIngredients
                    +"&number="+Math.min(100, numberOfRecipes)
                    +"&sort="+sort
                    +"&ignorePantry="+ignorePantry
                    +"&cuisine="+cuisines
                    +"&type="+type
                    +"&maxReadyTime="+maxReadyTime
                    +"&diet="+diets
                    +"&intolerances="+intolerances;

            HttpHeaders headers = new HttpHeaders();
            headers.set("x-rapidapi-key", apiKey);
            headers.set("x-rapidapi-host", "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com");

            // make get call to rapid api
           // make get call to rapid api
            try {
                RestTemplate restTemplate = new RestTemplate();
                restTemplate.getMessageConverters().add(new MappingJackson2HttpMessageConverter());

                ResponseEntity<List<RpdRecipeSearchByIngr>> response = restTemplate.exchange(
                        apiURL,
                        HttpMethod.GET,
                        new HttpEntity<>(headers),
                        new ParameterizedTypeReference<List<RpdRecipeSearchByIngr>>() {}
                );
                List<RpdRecipeSearchByIngr> recipes = response.getBody();
                return ResponseEntity.ok(recipes);

            }catch(Exception e) {
                e.printStackTrace();
                System.out.println("Error when calling get possible recipes complex:"+ e.getMessage());
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }

        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
