package com.exprecipe.backend.recipe;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RecipeRepo extends JpaRepository<Recipe, Integer> {
    List<Recipe> findRecipesByUser_Id(int userId);
}
