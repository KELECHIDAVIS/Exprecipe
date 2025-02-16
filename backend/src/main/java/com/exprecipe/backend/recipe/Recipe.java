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
    private String imageURL;
    private int servings;
    private int readyInMin;  // total time
    private int cookTime;
    private int prepTime;
    private String originalURL; // url to recipes original webiste
    private String spURL; // api given url that provides a lot of info about the recipe
    private String instructions;

    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ingredient> ingredients = new ArrayList<Ingredient>();

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

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public int getServings() {
        return servings;
    }

    public void setServings(int servings) {
        this.servings = servings;
    }

    public int getReadyInMin() {
        return readyInMin;
    }

    public void setReadyInMin(int readyInMin) {
        this.readyInMin = readyInMin;
    }

    public int getCookTime() {
        return cookTime;
    }

    public void setCookTime(int cookTime) {
        this.cookTime = cookTime;
    }

    public int getPrepTime() {
        return prepTime;
    }

    public void setPrepTime(int prepTime) {
        this.prepTime = prepTime;
    }

    public String getOriginalURL() {
        return originalURL;
    }

    public void setOriginalURL(String originalURL) {
        this.originalURL = originalURL;
    }

    public String getSpURL() {
        return spURL;
    }

    public void setSpURL(String spURL) {
        this.spURL = spURL;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public void setIngredients(List<Ingredient> ingredients) {
        this.ingredients = ingredients;
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
