package com.exprecipe.backend.recipe;


import com.exprecipe.backend.user.UserService;
import com.exprecipe.backend.user.userrecipe.UserRecipe;
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
    public ResponseEntity<String> deleteRecipe(@PathVariable Integer userId, @PathVariable Long recipeId) {
        return recipeService.deleteUserRecipe(recipeId);
    }

    /*
    @returns user's saved recipes
     */
    @GetMapping("/{userId}/recipe")
    public ResponseEntity<Set<UserRecipe>> getUserRecipes(@PathVariable Long userId) {
        return recipeService.getUserRecipes(userId);
    }

    /*
    @returns recipes that are possible based on user's ingredients
     returned in string form
     */
    @GetMapping("/{userId}/recipe/possible")
    public ResponseEntity<List<RpdRecipeSearchByIngr>> getPossibleRecipes(@PathVariable Long userId, @RequestParam Integer numberOfRecipes, @RequestParam Integer ranking, @RequestParam boolean ignorePantry ) {
        ResponseEntity<List<RpdRecipeSearchByIngr>> response =  recipeService.getPossibleRecipes(userId, numberOfRecipes, ranking, ignorePantry);
//        RpdRecipeSearchByIngr dummy = new RpdRecipeSearchByIngr();
//        dummy.setId(1);
//        dummy.setTitle("Dummy Recipe");
//        dummy.setImage("dummy.jpg");
//        dummy.setImageType("jpg");
//        dummy.setLikes(10);
//        return ResponseEntity.ok(List.of(dummy));
        return response ;
    }


    /*
    @returns recipes that are possible based on user's ingredients and complex filters
     returned in string form
     */
    @GetMapping("/{userId}/recipe/possible/complex")
    public ResponseEntity<String> getPossibleRecipesComplex(@PathVariable Long userId
            , @RequestParam Integer numberOfRecipes
            , @RequestParam String sort, @RequestParam boolean ignorePantry
            , @RequestParam String cuisines, @RequestParam String type, @RequestParam int maxReadyTime , @RequestParam int minServings
            , @RequestParam String diets, @RequestParam String intolerances ) {
        return recipeService.getPossibleRecipesComplex(userId,numberOfRecipes,ignorePantry, cuisines, type, maxReadyTime, minServings , sort, diets, intolerances );
    }

    /*
    @ returns recipe info object from external api using spid
     */
    @GetMapping("/{userId}/recipe/information")
    public ResponseEntity<String> getRecipeInformation(@PathVariable Long userId, @RequestParam Integer recipeId) {
        return recipeService.getRecipeInformation(userId, recipeId)   ;
    }


}
