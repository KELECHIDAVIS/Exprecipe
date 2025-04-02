package com.exprecipe.backend.ingredient;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IngredientRepo extends JpaRepository<Ingredient, Long> {

    Optional<Ingredient> findByName(String name);

    @Query(value = "SELECT * FROM ingredient WHERE similarity(name, :searchTerm) > 0.7 ORDER BY similarity(name, :searchTerm) DESC LIMIT 3", nativeQuery = true)
    List<Ingredient> findSimilarIngredients(@Param("searchTerm") String searchTerm);
}
