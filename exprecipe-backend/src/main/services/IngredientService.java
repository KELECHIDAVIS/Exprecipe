
package exprecipe_backend.springboot.service;

import exprecipe_backend.springboot.entity.Ingredient;
import exprecipe_backend.springboot.repository.IngredientRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Service layer is where all the business logic lies; functions that deal with the db
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class IngredientService {
    private final IngredientRepo ingredientRepo;

    // // For Admin Purposes get allll ingrs 
    // public List<Ingredient> getAllIngredients(){
    //     return ingredientRepo.findAll();
    // }
    
    public List<Ingredient> getAllUserIngredients (@RequestParam String uuid ){
        return ingredientRepo.findByUserId(uuid); 
    }

    public Ingredient getIngredientById(Integer id){
        Optional<Ingredient> optionalIngredient = ingredientRepo.findById(id);
        if(optionalIngredient.isPresent()){
            return optionalIngredient.get();
        }
        log.info("Ingredient with id: {} doesn't exist", id);
        return null;
    }

    public Ingredient saveIngredient (Ingredient ingredient){
        ingredient.setCreatedAt(LocalDateTime.now());
        ingredient.setUpdatedAt(LocalDateTime.now());
        Ingredient savedIngredient = ingredientRepo.save(ingredient);

        log.info("Ingredient with id: {} saved successfully", ingredient.getId());
        return savedIngredient;
    }

    public Ingredient updateIngredient (Ingredient ingredient) {
        Optional<Ingredient> existingIngredient = ingredientRepo.findById(ingredient.getId());
        ingredient.setCreatedAt(existingIngredient.get().getCreatedAt());
        ingredient.setUpdatedAt(LocalDateTime.now());

        Ingredient updatedIngredient = ingredientRepo.save(ingredient);

        log.info("Ingredient with id: {} updated successfully", ingredient.getId());
        return updatedIngredient;
    }

    public void deleteIngredientById (Integer id) {
        ingredientRepo.deleteById(id);
    }
}
