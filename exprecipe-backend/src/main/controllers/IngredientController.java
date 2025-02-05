package exprecipe_backend.springboot.controller;

import exprecipe_backend.springboot.entity.Ingredient;
import exprecipe_backend.springboot.service.IngredientService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller class is where all the user requests are handled and required/appropriate
 * responses are sent
 */
@RestController
@RequestMapping("/ingredient")
@RequiredArgsConstructor
@Validated
public class IngredientController {

    private final IngredientService ingredientService;

    /**
     * This method is called when a GET request is made
     * URL: localhost:8080/ingredient/
     * Purpose: Fetches all the ingredients in the ingredient table
     * @return List of Ingredients
     */
    @GetMapping("/")
    public ResponseEntity<List<Ingredient>> getAllIngredients(){
        return ResponseEntity.ok().body(ingredientService.getAllIngredients());
    }

    /**
     * This method is called when a GET request is made
     * URL: localhost:8080/ingredient/1 (or any other id)
     * Purpose: Fetches ingredient with the given id
     * @param id - ingredient id
     * @return Ingredient with the given id
     */
    @GetMapping("/{id}")
    public ResponseEntity<Ingredient> getIngredientById(@PathVariable Integer id)
    {
        return ResponseEntity.ok().body(ingredientService.getIngredientById(id));
    }

    /**
     * This method is called when a POST request is made
     * URL: localhost:8080/ingredient/
     * Purpose: Save an Ingredient entity
     * @param ingredient - Request body is an Ingredient entity
     * @return Saved Ingredient entity
     */
    @PostMapping("/")
    public ResponseEntity<Ingredient> saveIngredient(@RequestBody Ingredient ingredient)
    {
        return ResponseEntity.ok().body(ingredientService.saveIngredient(ingredient));
    }

    /**
     * This method is called when a PUT request is made
     * URL: localhost:8080/ingredient/
     * Purpose: Update an Ingredient entity
     * @param ingredient - Ingredient entity to be updated
     * @return Updated Ingredient
     */
    @PutMapping("/")
    public ResponseEntity<Ingredient> updateIngredient(@RequestBody Ingredient ingredient)
    {
        return ResponseEntity.ok().body(ingredientService.updateIngredient(ingredient));
    }

    /**
     * This method is called when a PUT request is made
     * URL: localhost:8080/ingredient/1 (or any other id)
     * Purpose: Delete an Ingredient entity
     * @param id - ingredient's id to be deleted
     * @return a String message indicating ingredient record has been deleted successfully
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteIngredientById(@PathVariable Integer id)
    {
        ingredientService.deleteIngredientById(id);
        return ResponseEntity.ok().body("Deleted ingredient successfully");
    }


}