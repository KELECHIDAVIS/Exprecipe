package com.exprecipe.backend.recipe;


import com.exprecipe.backend.ingredient.Ingredient;
import com.exprecipe.backend.user.User;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


/**
 * Users with common recipes will reference the same recipe to save on db space
 * Recipes will reference recipe ingredients
 */
@Entity
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private long spID; //api given id
    private String title;
    @Lob
    private String description;
    private String image;
    private int servings;
    private int readyInMinutes;  // total time
    private int cookingMinutes;
    private int preparationMinutes;
    private String sourceUrl; // url to recipes original webiste
    private String spoonacularSourceUrl; // api given url that provides a lot of info about the recipe
    @Lob
    private String instructions;

    @ElementCollection
    @CollectionTable(name = "dish_type", joinColumns = @JoinColumn(name = "id")) // 2
    @Column(name = "dish_types") // 3
    private Set<String> dishTypes; // might be helpful for saved recipe filter; { "lunch", "main-course","dinner"} etc.

    @ElementCollection
    @CollectionTable(name = "cuisine", joinColumns = @JoinColumn(name = "id")) // 2
    @Column(name = "cuisines") // 3
    private Set<String> cuisines; //could be a part of many different cuisines

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<RecipeIngredient> recipeIngredients = new HashSet<>();

    @ManyToMany(mappedBy = "savedRecipes")
    private Set<User> users = new HashSet<>();

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public Set<RecipeIngredient> getRecipeIngredients() {
        return recipeIngredients;
    }

    public void setRecipeIngredients(Set<RecipeIngredient> recipeIngredients) {
        this.recipeIngredients = recipeIngredients;
    }

    public Set<String> getCuisines() {
        return cuisines;
    }

    public void setCuisines(Set<String> cuisines) {
        this.cuisines = cuisines;
    }

    public Set<String> getDishTypes() {
        return dishTypes;
    }

    public void setDishTypes(Set<String> dishTypes) {
        this.dishTypes = dishTypes;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public String getSpoonacularSourceUrl() {
        return spoonacularSourceUrl;
    }

    public void setSpoonacularSourceUrl(String spoonacularSourceUrl) {
        this.spoonacularSourceUrl = spoonacularSourceUrl;
    }

    public String getSourceUrl() {
        return sourceUrl;
    }

    public void setSourceUrl(String sourceUrl) {
        this.sourceUrl = sourceUrl;
    }

    public int getPreparationMinutes() {
        return preparationMinutes;
    }

    public void setPreparationMinutes(int preparationMinutes) {
        this.preparationMinutes = preparationMinutes;
    }

    public int getCookingMinutes() {
        return cookingMinutes;
    }

    public void setCookingMinutes(int cookingMinutes) {
        this.cookingMinutes = cookingMinutes;
    }

    public int getReadyInMinutes() {
        return readyInMinutes;
    }

    public void setReadyInMinutes(int readyInMinutes) {
        this.readyInMinutes = readyInMinutes;
    }

    public int getServings() {
        return servings;
    }

    public void setServings(int servings) {
        this.servings = servings;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public long getSpID() {
        return spID;
    }

    public void setSpID(long spID) {
        this.spID = spID;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
