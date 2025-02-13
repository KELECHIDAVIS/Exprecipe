package com.exprecipe.backend.repos;

import com.exprecipe.backend.entities.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository is an interface that provides access to data in a database
 */
public interface IngredientRepo extends JpaRepository<Ingredient, Integer> {
    List<Ingredient> findIngredientsByUuid(String uuid);

}
