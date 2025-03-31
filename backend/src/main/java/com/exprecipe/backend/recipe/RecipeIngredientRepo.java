package com.exprecipe.backend.recipe;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface RecipeIngredientRepo extends JpaRepository<RecipeIngredient, Long> {

}
