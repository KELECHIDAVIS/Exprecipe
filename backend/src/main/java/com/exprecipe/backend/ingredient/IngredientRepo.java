package com.exprecipe.backend.ingredient;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface IngredientRepo extends JpaRepository<Ingredient, Long> {
    List<Ingredient> findIngredientsByUser_Id(Long userId);
    boolean existsIngredientBySpID(int spID);
    Optional<Ingredient> findByName(String name);
}
