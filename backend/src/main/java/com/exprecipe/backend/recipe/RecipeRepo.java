package com.exprecipe.backend.recipe;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RecipeRepo extends JpaRepository<Recipe, Integer> {
    List<Recipe> findRecipesByUser_Id(int userId);
    List<Recipe> findRecipeByUser_IdAndSpID(int userId, int spID);
}
