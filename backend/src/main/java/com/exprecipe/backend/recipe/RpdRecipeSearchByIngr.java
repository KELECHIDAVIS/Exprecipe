package com.exprecipe.backend.recipe;




import java.util.List;

// recipe returned by the search by ingredients endpoint
public class RpdRecipeSearchByIngr {
    private Integer id;
    private String title;
    private String image;
    private String imageType;
    private Integer usedIngredientCount;
    private Integer missedIngredientCount;
    private List<RpdSpRecipeIngredient> missedIngredients;
    private List<RpdSpRecipeIngredient> usedIngredients;
    private List<RpdSpRecipeIngredient> unusedIngredients;
    private Integer likes;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getImageType() {
        return imageType;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    public Integer getUsedIngredientCount() {
        return usedIngredientCount;
    }

    public void setUsedIngredientCount(Integer usedIngredientCount) {
        this.usedIngredientCount = usedIngredientCount;
    }

    public Integer getMissedIngredientCount() {
        return missedIngredientCount;
    }

    public void setMissedIngredientCount(Integer missedIngredientCount) {
        this.missedIngredientCount = missedIngredientCount;
    }

    public List<RpdSpRecipeIngredient> getMissedIngredients() {
        return missedIngredients;
    }

    public void setMissedIngredients(List<RpdSpRecipeIngredient> missedIngredients) {
        this.missedIngredients = missedIngredients;
    }

    public List<RpdSpRecipeIngredient> getUsedIngredients() {
        return usedIngredients;
    }

    public void setUsedIngredients(List<RpdSpRecipeIngredient> usedIngredients) {
        this.usedIngredients = usedIngredients;
    }

    public List<RpdSpRecipeIngredient> getUnusedIngredients() {
        return unusedIngredients;
    }

    public void setUnusedIngredients(List<RpdSpRecipeIngredient> unusedIngredients) {
        this.unusedIngredients = unusedIngredients;
    }

    public Integer getLikes() {
        return likes;
    }

    public void setLikes(Integer likes) {
        this.likes = likes;
    }
}
