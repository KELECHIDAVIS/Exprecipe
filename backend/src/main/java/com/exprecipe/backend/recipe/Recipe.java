package com.exprecipe.backend.recipe;


import com.exprecipe.backend.ingredient.Ingredient;
import com.exprecipe.backend.user.User;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private long spID; //api given id
    private String title;
    private String description;
    private String image;
    private int servings;
    private int readyInMinutes;  // total time
    private int cookingMinutes;
    private int preparationMinutes;
    private String sourceUrl; // url to recipes original webiste
    private String spoonacularSourceUrl; // api given url that provides a lot of info about the recipe
    private String instructions;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ingredient> extendedIngredients = new ArrayList<Ingredient>();

    @ElementCollection
    @CollectionTable(name = "dish_type", joinColumns = @JoinColumn(name = "id")) // 2
    @Column(name = "dish_types") // 3
    private Set<String> dishTypes; // might be helpful for saved recipe filter; { "lunch", "main-course","dinner"} etc.



    @ElementCollection
    @CollectionTable(name = "cuisine", joinColumns = @JoinColumn(name = "id")) // 2
    @Column(name = "cuisines") // 3
    private Set<String> cuisines; //could be a part of many different cuisines


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    public List<Ingredient> getExtendedIngredients() {
        return extendedIngredients;
    }

    public void setExtendedIngredients(List<Ingredient> extendedIngredients) {
        this.extendedIngredients = extendedIngredients;
    }
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public long getSpID() {
        return spID;
    }

    public void setSpID(long spID) {
        this.spID = spID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String imageURL) {
        this.image = imageURL;
    }

    public int getServings() {
        return servings;
    }

    public void setServings(int servings) {
        this.servings = servings;
    }

    public int getReadyInMinutes() {
        return readyInMinutes;
    }

    public void setReadyInMinutes(int readyInMin) {
        this.readyInMinutes = readyInMin;
    }

    public int getCookingMinutes() {
        return cookingMinutes;
    }

    public void setCookingMinutes(int cookTime) {
        this.cookingMinutes = cookTime;
    }

    public int getPreparationMinutes() {
        return preparationMinutes;
    }

    public void setPreparationMinutes(int prepTime) {
        this.preparationMinutes = prepTime;
    }

    public String getSourceUrl() {
        return sourceUrl;
    }

    public void setSourceUrl(String originalURL) {
        this.sourceUrl = originalURL;
    }

    public String getSpoonacularSourceUrl() {
        return spoonacularSourceUrl;
    }

    public void setSpoonacularSourceUrl(String spURL) {
        this.spoonacularSourceUrl = spURL;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public List<Ingredient> getIngredients() {
        return extendedIngredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.extendedIngredients = ingredients;
    }

    public Set<String> getDishTypes() {
        return dishTypes;
    }

    public void setDishTypes(Set<String> dishTypes) {
        this.dishTypes = dishTypes;
    }

    public Set<String> getCuisines() {
        return cuisines;
    }

    public void setCuisines(Set<String> cuisines) {
        this.cuisines = cuisines;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
