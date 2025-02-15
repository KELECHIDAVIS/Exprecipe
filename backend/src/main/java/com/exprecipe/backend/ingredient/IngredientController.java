package com.exprecipe.backend.ingredient;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/{userId}/ingredient")
    public ResponseEntity<Ingredient> createUserIngredient(@PathVariable(value= "userId") int userId, @RequestBody Ingredient ingredient) {
        return ingredientService.addIngredient(userId, ingredient);
    }
}
