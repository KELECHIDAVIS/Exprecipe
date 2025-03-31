package com.exprecipe.backend.ingredient;

import com.exprecipe.backend.recipe.RecipeIngredient;
import com.exprecipe.backend.user.userIngr.UserIngredient;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;


import java.util.HashSet;
import java.util.List;
import java.util.Set;


/***
 * So This ingredient class is going to be more of a template for the RecipeIngr and UserIngr Class
 * It's going to have a OneToMany relationship with both so that recipes and users only reference one instance of the same ingredient so that we dont
 * have to save duplicate instances of the same common ingredient
 */
@Entity
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int spID; // api given ingredient id

    @Column(unique = true, nullable = false)
    private String name;
    private String image;
    private String aisle;

    @OneToMany(mappedBy = "ingredient", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<UserIngredient> userIngredients = new HashSet<UserIngredient>();

    @OneToMany(mappedBy = "ingredient", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private Set<RecipeIngredient> recipeIngredients = new HashSet<RecipeIngredient>();


    @ElementCollection
    @CollectionTable(name = "possible_unit", joinColumns = @JoinColumn(name = "id")) // 2
    @Column(name = "possible_units") // 3
    private List<String> possibleUnits; // some ingrs have different possiblites. ex: 3 slices for pineapple or pinch of salt

    //Getters and Setters

    public List<String> getPossibleUnits() {
        return possibleUnits;
    }

    public void setPossibleUnits(List<String> possibleUnits) {
        this.possibleUnits = possibleUnits;
    }

    public String getAisle() {
        return aisle;
    }

    public void setAisle(String aisle) {
        this.aisle = aisle;
    }

    public Long getId() {
        return id;
    }

    public int getSpID() {
        return spID;
    }

    public String getName() {
        return name;
    }

    public String getImage() {
        return image;
    }

    public Set<UserIngredient> getUserIngredients() {
        return userIngredients;
    }

    public Set<RecipeIngredient> getRecipeIngredients() {
        return recipeIngredients;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setSpID(int spID) {
        this.spID = spID;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setUserIngredients(Set<UserIngredient> userIngredients) {
        this.userIngredients = userIngredients;
    }

    public void setRecipeIngredients(Set<RecipeIngredient> recipeIngredients) {
        this.recipeIngredients = recipeIngredients;
    }
}
