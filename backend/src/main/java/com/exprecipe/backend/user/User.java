package com.exprecipe.backend.user;

import com.exprecipe.backend.ingredient.Ingredient;
import com.exprecipe.backend.recipe.Recipe;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.*;

@Entity
@Table(name = "\"user\"")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ElementCollection
    @CollectionTable(name = "diet_restriction", joinColumns = @JoinColumn(name = "id")) // 2
    @Column(name = "diet_restrictions") // 3
    private Set<String> dietRestrictions;
    private boolean premiumUser;
    private LocalDate createdAt;


    // User's personal ingredient list (their pantry)
    @ManyToMany
    @JoinTable(
            name = "user_ingredients",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "ingredient_id")
    )
    private Set<Ingredient> ingredients = new HashSet<>();

    // User's saved recipes
    @ManyToMany
    @JoinTable(
            name = "user_recipes",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "recipe_id")
    )
    private Set<Recipe> savedRecipes = new HashSet<>();


    public Set<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(Set<Ingredient> ingredients) {
        this.ingredients = ingredients;
    }

    public Set<Recipe> getSavedRecipes() {
        return savedRecipes;
    }

    public void setSavedRecipes(Set<Recipe> savedRecipes) {
        this.savedRecipes = savedRecipes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<String> getDietRestrictions() {
        return dietRestrictions;
    }

    public void setDietRestrictions(Set<String> dietRestrictions) {
        this.dietRestrictions = dietRestrictions;
    }

    public boolean isPremiumUser() {
        return premiumUser;
    }

    public void setPremiumUser(boolean premiumUser) {
        this.premiumUser = premiumUser;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }


}
