package com.exprecipe.backend.controller;


import com.exprecipe.backend.entities.Ingredient;
import com.exprecipe.backend.repos.IngredientRepo;
import org.springframework.web.bind.annotation.*;

//implements the outlined repo functions
@RestController
public class IngredientController {
    private final IngredientRepo ingredientRepo;

    public IngredientController(IngredientRepo ingredientRepo) {
        this.ingredientRepo = ingredientRepo;
    }

    //add ingredient to the db
    @PostMapping("/ingredients")
    public Ingredient addIngredient(@RequestBody Ingredient ingredient) {
        return ingredientRepo.save(ingredient);
    }

    // return all the ingredients associated with entered user
    @GetMapping("/ingredients")
    public Iterable<Ingredient> getUserIngredients(@RequestParam String uuid) {
        return ingredientRepo.findAllUserIngrs(uuid);
    }
}
