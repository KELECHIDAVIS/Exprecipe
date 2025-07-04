package com.exprecipe.backend.ingredient;


import com.exprecipe.backend.user.UserService;
import com.exprecipe.backend.user.userIngr.UserIngredient;
import com.exprecipe.backend.user.userIngr.UserIngredientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/user")
public class IngredientController {
    private final UserService userService;
    private final IngredientService ingredientService;
    private final UserIngredientService userIngredientService;

    @Autowired
    public IngredientController(UserService userService, IngredientService ingredientService, UserIngredientService userIngredientService) {
        this.userService = userService;
        this.ingredientService = ingredientService;
        this.userIngredientService = userIngredientService;
    }

    /*
    GET all user ingredients
    @return a list of ingredients associated with input user
     */
    @GetMapping("/{userId}/ingredient")
    public ResponseEntity<Set<UserIngredient>> getUserIngredients(@PathVariable(value= "userId") Long userId) {
        return userIngredientService.getUserPantry(userId);
    }

    /*
    POST create ingredient associated with inputted user
    @returns created ingredient
     */
    @PostMapping("/{userId}/ingredient")
    public ResponseEntity<UserIngredient> createUserIngredient(@PathVariable(value= "userId") Long userId, @RequestBody SpoonacularIngredient spIngredient) {
        return userIngredientService.saveIngredientToPantry(userId, spIngredient);
    }

    @PostMapping("/{userId}/ingredient/list")
    public ResponseEntity<List<UserIngredient>> addListOfIngredients(@PathVariable Long userId, @RequestBody List<String> ingrNames) {
        return userIngredientService.addListOfIngredients(userId, ingrNames);
    }
    /*
    DELETE specified ingredient user ingredient
    @returns a string confirming deletion
     */
    @DeleteMapping("/{userId}/ingredient/{ingredientId}")
    public ResponseEntity<String> deleteUserIngredient(@PathVariable(value= "userId") Long userId, @PathVariable(value= "ingredientId") Long ingredientId) {
        return userIngredientService.deleteIngredient(ingredientId);
    }

    /*
    PUT update specified ingredient
     */
    @PutMapping("/{userId}/ingredient/{ingredientId}")
    public ResponseEntity<UserIngredient> updateIngredient(@RequestBody UserIngredient ingredient) {
        return userIngredientService.updateIngredient(ingredient);
    }




    /*
    POST detects ingredients within inputted image and returns a list of detected ingredient names as a comma separated string
    IT'S RATE LIMITED PER USER, AVG USERS GET 3 CALLS PER DAY, PREMIUM GET 10
    */
    @PostMapping("/{user}/ingredient/detect")
    public ResponseEntity<String> detectIngredientsInImage(@RequestPart("image") MultipartFile imageFile) {
        System.out.println(imageFile);
        try{
            return ingredientService.detectIngredientsInImage(imageFile);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body( "Error Detecting Ingredients: "+e.getMessage());
        }
    }

    @GetMapping("/{user}/ingredient/search")
    public ResponseEntity<SpoonacularIngredient[]> searchIngredients( @RequestParam String search) {
       return ingredientService.ingredientSearch(search);
    }


}
