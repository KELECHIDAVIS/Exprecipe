package com.exprecipe.backend.controllers;

import com.exprecipe.backend.entities.Ingredient;
import com.exprecipe.backend.services.IngredientService;
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
@RequiredArgsConstructor
@Validated
public class IngredientController {
    private final IngredientService service;

    /**
     * GET
     * /ingredient?uuid=123
     * Purpose: Returns all ingredients associated with uuid in param
     * @return list of ingredients
     */
    @GetMapping("/ingredients")
    public ResponseEntity<List<Ingredient>> getUserIngredients(@RequestParam String uuid) {
        return ResponseEntity.ok().body(service.findUserIngredients(uuid));
    }

    /**
     * POST
     * /ingredient
     * Purpose: Saves ingredient to db
     * @return saved ingredient entity
     */
    @PostMapping("/ingredients")
    public ResponseEntity<Ingredient> saveIngredient(@RequestBody Ingredient ingredient) {
        return ResponseEntity.ok().body(service.saveIngredient(ingredient));
    }

    /**
     * DELETE
     * /ingredient/{id}
     * Purpose: Deletes this ingredient
     * @return string message indicating that ingredient has been deleted
     */
    @DeleteMapping("/ingredients/{id}")
    public ResponseEntity<String> deleteIngredient(@PathVariable Integer id) {
        return ResponseEntity.ok().body("Deleted Ingredient Successfully");
    }


}
