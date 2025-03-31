package com.exprecipe.backend.user.userrecipe;

import com.exprecipe.backend.recipe.Recipe;
import com.exprecipe.backend.user.User;
import jakarta.persistence.*;

/**
 * User's recipes,
 * One user can have multiple recipes
 * One User Recipes can only reference one Recipe
 */
@Entity
public class UserRecipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Recipe getRecipe() {
        return recipe;
    }

    public void setRecipe(Recipe recipe) {
        this.recipe = recipe;
    }
}
