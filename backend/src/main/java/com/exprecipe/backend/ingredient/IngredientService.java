package com.exprecipe.backend.ingredient;

import com.exprecipe.backend.user.User;
import com.exprecipe.backend.user.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class IngredientService {
    private final IngredientRepo ingredientRepo;
    private final UserRepo userRepo;
    @Autowired
    public IngredientService(IngredientRepo ingredientRepo, UserRepo userRepo) {
        this.ingredientRepo = ingredientRepo;
        this.userRepo = userRepo;
    }


    public ResponseEntity<List<Ingredient>> getUserIngredients(Integer userId) {

        return ResponseEntity.ok(ingredientRepo.findIngredientsByUser_Id(userId));
    }
    public ResponseEntity<Ingredient> addIngredient(Integer userId, Ingredient ingredient) {

        Optional<User> userOpt = userRepo.findById(userId);

        // if user is present save ingredient
        if(userOpt.isPresent()){
            ingredientRepo.save(ingredient);
            return ResponseEntity.status(HttpStatus.CREATED).body(ingredient);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    public ResponseEntity<String> deleteIngredient(int ingrId) {
        try {
            ingredientRepo.deleteById(ingrId);
        }catch (EmptyResultDataAccessException e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No Ingredient With That Id Exists");
        }
        return ResponseEntity.ok().body("Ingredient deleted");
    }

    public ResponseEntity<Ingredient> updateIngredient(Ingredient ingredient) {
        Optional<Ingredient> possibleIngr = ingredientRepo.findById(ingredient.getId());

        if(possibleIngr.isPresent()) {
            ingredientRepo.save(ingredient);
            return ResponseEntity.ok(ingredient);
        }
        return ResponseEntity.badRequest().build();
    }
    public ResponseEntity<Ingredient> updateIngredientAmount(int ingrId, int amount) {
        Optional<Ingredient> possibleIngr = ingredientRepo.findById(ingrId);

        if(possibleIngr.isPresent()) {
            Ingredient ingredient = possibleIngr.get();
            ingredient.setAmount(amount);
            ingredientRepo.save(ingredient);
            return ResponseEntity.ok(ingredient);
        }
        return ResponseEntity.badRequest().build();
    }

    public ResponseEntity<Ingredient> updateIngredientUnit(int ingrId, String unit) {
        Optional<Ingredient> possibleIngr = ingredientRepo.findById(ingrId);

        if(possibleIngr.isPresent()) {
            Ingredient ingredient = possibleIngr.get();
            ingredient.setUnit(unit);
            ingredientRepo.save(ingredient);
            return ResponseEntity.ok(ingredient);
        }
        return ResponseEntity.badRequest().build();
    }

    public ResponseEntity<Ingredient> updateIngredientPossibleUnits(int ingrId, List<String> possibleUnits) {
        Optional<Ingredient> possibleIngr = ingredientRepo.findById(ingrId);

        if(possibleIngr.isPresent()) {
            Ingredient ingredient = possibleIngr.get();
            ingredient.setPossibleUnits(possibleUnits);
            ingredientRepo.save(ingredient);
            return ResponseEntity.ok(ingredient);
        }
        return ResponseEntity.badRequest().build();
    }

}
