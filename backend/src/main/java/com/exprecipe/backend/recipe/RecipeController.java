package com.exprecipe.backend.recipe;


import com.exprecipe.backend.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/v1/user")
public class RecipeController {
    private final RecipeService recipeService;
    private final UserService userService;

    @Autowired
    public RecipeController(RecipeService recipeService, UserService userService) {

        this.recipeService = recipeService;
        this.userService = userService;
    }

    @PostMapping("/{userId}/recipe")
    public ResponseEntity<Recipe> addRecipe(@PathVariable Long userId, @RequestBody SpoonacularRecipe recipe) {
        return recipeService.saveRecipe(userId, recipe);
    }

    @DeleteMapping("/{userId}/recipe/{recipeId}")
    public ResponseEntity<String> deleteRecipe(@PathVariable Integer userId, @PathVariable Integer recipeId) {
        return recipeService.deleteRecipe(recipeId);
    }

    /*
    @returns user's saved recipes
     */
    @GetMapping("/{userId}/recipe")
    public ResponseEntity<Set<Recipe>> getUserRecipes(@PathVariable Long userId) {
        return userService.getUserRecipes(userId);
    }

    /*
    @returns recipes that are possible based on user's ingredients
     returned in string form
     */
    @GetMapping("/{userId}/recipe/possible")
    public ResponseEntity<String> getPossibleRecipes(@PathVariable Long userId, @RequestParam Integer numberOfRecipes, @RequestParam Integer ranking, @RequestParam boolean ignorePantry ) {
        return recipeService.getPossibleRecipes(userId, numberOfRecipes, ranking, ignorePantry);
    }

    /*
    @ returns recipe info object from external api
     */
    @GetMapping("/{userId}/recipe/information")
    public ResponseEntity<String> getRecipeInformation(@PathVariable Integer userId, @RequestParam Integer recipeId) {
        return recipeService.getRecipeInformation(userId, recipeId)   ;
    }


}
