/*
 * Repos are an interface that provides access to data in the database 
 */

package exprecipe_backend.springboot.repository;

import exprecipe_backend.springboot.entity.Ingredient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IngredientRepo extends JpaRepository<Ingredient, Integer>{
    // method to find by user id 
    List<Ingredient> findByUserId(String uuid); 
}
