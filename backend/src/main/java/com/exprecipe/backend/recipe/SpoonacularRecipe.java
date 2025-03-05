package com.exprecipe.backend.recipe;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;

// the form the api returns recipes in
@JsonIgnoreProperties
class SpoonacularRecipe {
    private Integer id;
    private String image;
    private String imageType;
    private Integer likes;
    private Integer missedIngredientCount;
    private List<SpRecipeIngredient> missedIngredients;
    private String title;
    private List<SpRecipeIngredient> unusedIngredients;
    private Integer usedIngredientCount;
    private List<SpRecipeIngredient> usedIngredients;
}

