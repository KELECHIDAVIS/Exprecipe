package com.exprecipe.backend.user.userIngr;

import com.exprecipe.backend.ingredient.Ingredient;
import com.exprecipe.backend.ingredient.IngredientRepo;
import com.exprecipe.backend.ingredient.IngredientService;
import com.exprecipe.backend.ingredient.SpoonacularIngredient;
import com.exprecipe.backend.user.User;
import com.exprecipe.backend.user.UserRepo;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserIngredientService {
    private final UserIngredientRepo userIngredientRepo;
    private final UserRepo userRepo;
    private final IngredientRepo ingredientRepo;
    private final IngredientService ingredientService;

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
                ingr = ingredientService.saveSpoonacularIngredient(spoonacularIngredient , user.get());
            }else{
                ingr = ingredientOpt.get();
            }

            // now create a user ingredient that reference's that ingr
            UserIngredient userIngr = new UserIngredient();
            userIngr.setUser(user.get());
            userIngr.setIngredient(ingr);

            return ResponseEntity.ok(userIngredientRepo.save(userIngr));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
