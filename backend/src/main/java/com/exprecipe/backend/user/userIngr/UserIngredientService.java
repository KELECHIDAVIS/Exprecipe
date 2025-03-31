package com.exprecipe.backend.user.userIngr;

import com.exprecipe.backend.ingredient.Ingredient;
import com.exprecipe.backend.ingredient.IngredientRepo;
import com.exprecipe.backend.ingredient.IngredientService;
import com.exprecipe.backend.ingredient.SpoonacularIngredient;
import com.exprecipe.backend.user.User;
import com.exprecipe.backend.user.UserRepo;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserIngredientService {
    private final UserIngredientRepo userIngredientRepo;
    private final UserRepo userRepo;
    private final IngredientRepo ingredientRepo;
    private final IngredientService ingredientService;

    @Value("${api.key}")
    private String apiKey;

    public UserIngredientService(UserIngredientRepo userIngredientRepo, UserRepo userRepo, IngredientRepo ingredientRepo, IngredientService ingredientService) {
        this.userIngredientRepo = userIngredientRepo;
        this.userRepo = userRepo;
        this.ingredientRepo = ingredientRepo;
        this.ingredientService = ingredientService;
    }

    // get all user's ingredients
    public ResponseEntity<Set<UserIngredient>> getUserPantry(Long userId) {
        return ResponseEntity.ok(userIngredientRepo.findByUser_Id(userId));
    }

    // save ingr from api to user's pantry
    public ResponseEntity<UserIngredient> saveIngredientToPantry(Long userId, SpoonacularIngredient spoonacularIngredient) {
        Optional<User> user = userRepo.findById(userId);

        if(user.isPresent()) {

            // if ingredient by that name doesn't exist save ingr translate into ingr
            Optional<Ingredient > ingredientOpt = ingredientRepo.findByName(spoonacularIngredient.getName());
            Ingredient ingr;

            if(!ingredientOpt.isPresent()) {
                // map sp ingr to our type
                ingr = ingredientService.translateAndSaveSpIngredient(spoonacularIngredient );
            }else{
                ingr = ingredientOpt.get();
            }

            // now create a user ingredient that references that ingr
            UserIngredient userIngr = new UserIngredient();
            userIngr.setUser(user.get());
            userIngr.setIngredient(ingr);

            return ResponseEntity.ok(userIngredientRepo.save(userIngr));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    public ResponseEntity<UserIngredient> updateIngredient(UserIngredient ingredient) {
        Optional<UserIngredient> possibleIngr = userIngredientRepo.findById(ingredient.getId());

        if(possibleIngr.isPresent()) {
            UserIngredient userIngr = possibleIngr.get();
            userIngr.setAmount(ingredient.getAmount());
            userIngr.setUnit (ingredient.getUnit());

            return ResponseEntity.ok(userIngredientRepo.save(userIngr));
        }
        return ResponseEntity.badRequest().build();
    }

    public ResponseEntity<String> deleteIngredient(Long ingrId) {
        try {
            userIngredientRepo.deleteById(ingrId);
        }catch (EmptyResultDataAccessException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Ingredient With That Id Exists");
        }
        return ResponseEntity.ok().body("Ingredient deleted");
    }

    // adds list of user ingredients using list of ingredient names that's returned from the scanned image
    public ResponseEntity<List<UserIngredient>> addListOfIngredients(Long userId, List<String> ingrNames) {

        // first check user is valid
        Optional<User> userOpt = userRepo.findById(userId);

        if(userOpt.isPresent()){
            List<UserIngredient> detectedIngrs= new ArrayList<>();

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
                        Ingredient ingr = ingredientService.translateAndSaveSpIngredient(list[0]);

                        // now create a user ingredient that references that ingr
                        UserIngredient userIngr = new UserIngredient();
                        userIngr.setUser(userOpt.get());
                        userIngr.setIngredient(ingr);
                        userIngredientRepo.save(userIngr); // save user ingr

                        detectedIngrs.add(userIngr); // add to list
                    }
                }catch(Exception e){
                    // if not found just continue onto the next
                }
            }
            return ResponseEntity.ok(detectedIngrs); // return ingredients
        }
        return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).build(); // user doesn't exist
    }
}
