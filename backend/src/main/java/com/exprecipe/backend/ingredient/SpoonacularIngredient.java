package com.exprecipe.backend.ingredient;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

// the form the api returns ingreidents in
@JsonIgnoreProperties
public class SpoonacularIngredient {
    private String name;
    private String image;
    private Integer id; // spoonac id
    private String aisle;
    private List<String> possibleUnits;

    public SpoonacularIngredient(String name, String image, Integer id, String aisle, List<String> possibleUnits) {
        this.name = name;
        this.image = image;
        this.id = id;
        this.aisle = aisle;
        this.possibleUnits = possibleUnits;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getAisle() {
        return aisle;
    }

    public void setAisle(String aisle) {
        this.aisle = aisle;
    }

    public List<String> getPossibleUnits() {
        return possibleUnits;
    }

    public void setPossibleUnits(List<String> possibleUnits) {
        this.possibleUnits = possibleUnits;
    }
}
