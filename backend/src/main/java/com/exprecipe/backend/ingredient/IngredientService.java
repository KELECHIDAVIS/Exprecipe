package com.exprecipe.backend.ingredient;

import com.exprecipe.backend.user.User;
import com.exprecipe.backend.user.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

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
        List<Ingredient> ingredients = ingredientRepo.findByUserId(userId);

        return ResponseEntity.ok(ingredients);
    }
    public ResponseEntity<Ingredient> addIngredient(Integer userId, Ingredient ingredient) {

        // first find the user associated
        try{
            User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        }catch(RuntimeException e){
            return ResponseEntity.notFound().build();
        }

        ingredientRepo.save(ingredient);
        return ResponseEntity.ok(ingredient);
    }

    public ResponseEntity<Object> deleteIngredient(Ingredient ingredient) {
        ingredientRepo.delete(ingredient);
        return ResponseEntity.ok(ingredient);
    }

}
