package com.exprecipe.backend.ingredient;


import com.exprecipe.backend.user.UserService;
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

    @Autowired
    public IngredientController(UserService userService, IngredientService ingredientService) {
        this.userService = userService;
        this.ingredientService = ingredientService;
    }

    /*
    GET all user ingredients
    @return a list of ingredients associated with input user
     */
    @GetMapping("/{userId}/ingredient")
    public ResponseEntity<Set<Ingredient>> getUserIngredients(@PathVariable(value= "userId") Long userId) {
        return userService.getUserIngredients(userId);
    }

    /*
    POST create ingredient associated with inputted user
    @returns created ingredient
     */
    @PostMapping("/{userId}/ingredient")
    public ResponseEntity<Ingredient> createUserIngredient(@PathVariable(value= "userId") Long userId, @RequestBody SpoonacularIngredient spIngredient) {
        return ingredientService.addIngredient(userId, spIngredient);
    }

    @PostMapping("/{userId}/ingredient/list")
    public ResponseEntity<List<Ingredient>> addListOfIngredients(@PathVariable Long userId, @RequestBody List<String> ingrNames) {
        return ingredientService.addListOfIngredients(userId, ingrNames);
    }
    /*
    DELETE specified ingredient
    @returns a string confirming deletion
     */
    @DeleteMapping("/{userId}/ingredient/{ingredientId}")
    public ResponseEntity<String> deleteUserIngredient(@PathVariable(value= "userId") Long userId, @PathVariable(value= "ingredientId") Long ingredientId) {
        return ingredientService.deleteIngredient(ingredientId);
    }

    /*
    PUT update specified ingredient
     */
    @PutMapping("/{userId}/ingredient/{ingredientId}")
    public ResponseEntity<Ingredient> updateIngredient( @RequestBody Ingredient ingredient) {
        return ingredientService.updateIngredient(ingredient);
    }

    /*
    PUT update specified ingredient's amount
     */
    @PutMapping("/{userId}/ingredient/{ingredientId}/amount")
    public ResponseEntity<Ingredient> updateIngredientAmount(@PathVariable int ingredientId, @RequestParam("amount") int amount) {
        return ingredientService.updateIngredientAmount(ingredientId, amount);
    }
    /*
    PUT update specified ingredient's unit
     */
    @PutMapping("/{userId}/ingredient/{ingredientId}/unit")
    public ResponseEntity<Ingredient> updateIngredientUnit(@PathVariable int ingredientId, @RequestParam("unit") String unit) {
        return ingredientService.updateIngredientUnit(ingredientId, unit);
    }

    /*
    PUT update specified ingredient's amount
     */
    @PutMapping("/{userId}/ingredient/{ingredientId}/possible+units")
    public ResponseEntity<Ingredient> updateIngredientPossibleUnits(@PathVariable int ingredientId, @RequestBody List<String> possibleUnits) {
        return ingredientService.updateIngredientPossibleUnits(ingredientId, possibleUnits);
    }

    /*
    POST detects ingredients within inputted image and returns a list of detected ingredient names as a comma separated string
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
    public ResponseEntity<SpoonacularIngredient[]> searchIngredients( @RequestParam String search, @RequestParam Integer number) {
       return ingredientService.ingredientSearch(search, number);
    }


}
