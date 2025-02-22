package com.exprecipe.backend.ingredient;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/user")
public class IngredientController {

    private final IngredientService ingredientService;

    @Autowired
    public IngredientController(IngredientService ingredientService) {
        this.ingredientService = ingredientService;
    }

    /*
    GET all user ingredients
    @return a list of ingredients associated with input user
     */
    @GetMapping("/{userId}/ingredient")
    public ResponseEntity<List<Ingredient>> getUserIngredients(@PathVariable(value= "userId") int userId) {
        return ingredientService.getUserIngredients(userId);
    }

    /*
    POST create ingredient associated with inputted user
    @returns created ingredient
     */
    @PostMapping("/{userId}/ingredient")
    public ResponseEntity<Ingredient> createUserIngredient(@PathVariable(value= "userId") int userId, @RequestBody SpoonacularIngredient spIngredient) {
        return ingredientService.addIngredient(userId, spIngredient);
    }
    /*
    DELETE specified ingredient
    @returns a string confirming deletion
     */
    @DeleteMapping("/{userId}/ingredient/{ingredientId}")
    public ResponseEntity<String> deleteUserIngredient(@PathVariable(value= "userId") int userId, @PathVariable(value= "ingredientId") int ingredientId) {
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
    public String detectIngredientsInImage(@RequestPart("image") MultipartFile imageFile) {
        try{
            return ingredientService.detectIngredientsInImage(imageFile);
        }catch (Exception e) {
            return "Error Detecting Ingredients: "+e.getMessage();
        }
    }

    @GetMapping("/{user}/ingredient/search")
    public SpoonacularIngredient[] searchIngredients( @RequestParam String search, @RequestParam Integer number) {
       return ingredientService.ingredientSearch(search, number);
    }


}
