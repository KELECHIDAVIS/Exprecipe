package com.exprecipe.backend.services;


import com.exprecipe.backend.entities.Ingredient;
import com.exprecipe.backend.repos.IngredientRepo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;


/**
 * Service layer is where all the business logic lies
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class IngredientService {
    private final IngredientRepo repo;

    public List<Ingredient> findUserIngredients(String uuid) {
        return repo.findIngredientsByUuid(uuid);
    }

    public void deleteIngredient(Integer id) {
        repo.deleteById(id);
    }

    public Ingredient saveIngredient(Ingredient ingredient) {
        Ingredient ingredientSaved = repo.save(ingredient);

        log.info("Ingredient with id {} saved successfully", ingredientSaved.getId());
        return ingredientSaved;
    }
}
