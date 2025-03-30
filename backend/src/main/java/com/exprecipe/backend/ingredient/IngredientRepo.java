package com.exprecipe.backend.ingredient;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface IngredientRepo extends JpaRepository<Ingredient, Integer> {
    List<Ingredient> findIngredientsByUser_Id(int userId);
    boolean existsIngredientBySpID(int spID);
}
