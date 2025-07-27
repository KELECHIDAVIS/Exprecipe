package com.exprecipe.backend.recipe;




import java.util.List;

// recipe returned by the search by ingredients endpoint
public class RpdRecipeSearchByIngr {
    private Integer id;
    private String title;
    private String image;
    private String imageType;
    private int usedIngredientCount;
    private int missedIngredientCount;
    private List<SpRecipeIngredient> missedIngredients;
    private List<SpRecipeIngredient> usedIngredients;
    private List<SpRecipeIngredient> unusedIngredients;
    private int likes;

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

    public int getUsedIngredientCount() {
        return usedIngredientCount;
    }

    public void setUsedIngredientCount(int usedIngredientCount) {
        this.usedIngredientCount = usedIngredientCount;
    }

    public int getMissedIngredientCount() {
        return missedIngredientCount;
    }

    public void setMissedIngredientCount(int missedIngredientCount) {
        this.missedIngredientCount = missedIngredientCount;
    }

    public List<SpRecipeIngredient> getMissedIngredients() {
        return missedIngredients;
    }

    public void setMissedIngredients(List<SpRecipeIngredient> missedIngredients) {
        this.missedIngredients = missedIngredients;
    }

    public List<SpRecipeIngredient> getUsedIngredients() {
        return usedIngredients;
    }

    public void setUsedIngredients(List<SpRecipeIngredient> usedIngredients) {
        this.usedIngredients = usedIngredients;
    }

    public List<SpRecipeIngredient> getUnusedIngredients() {
        return unusedIngredients;
    }

    public void setUnusedIngredients(List<SpRecipeIngredient> unusedIngredients) {
        this.unusedIngredients = unusedIngredients;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }
}
