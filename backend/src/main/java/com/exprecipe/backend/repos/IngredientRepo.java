package com.exprecipe.backend.repos;

// interface outlines all the functions that will be used

import com.exprecipe.backend.entities.Ingredient;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface IngredientRepo extends CrudRepository<Ingredient, Integer> {
    Iterable<Ingredient> findAllUserIngrs(String uuid); // returns all the ingredients that have that uuid
}
