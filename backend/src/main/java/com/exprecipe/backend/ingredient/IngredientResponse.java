// rapid api returns in this format
package com.exprecipe.backend.ingredient;
import com.exprecipe.backend.ingredient.SpoonacularIngredient;
public class IngredientResponse{
    private SpoonacularIngredient[] results; 
    private int offset; 
    private int number ; 
    private int totalResults ; 
      // Getters and setters
    public SpoonacularIngredient[] getResults() {
        return results;
    }
    public void setResults(SpoonacularIngredient[] results) {
        this.results = results;
    }

    public int getOffset() {
        return offset;
    }
    public void setOffset(int offset) {
        this.offset = offset;
    }

    public int getNumber() {
        return number;
    }
    public void setNumber(int number) {
        this.number = number;
    }

    public int getTotalResults() {
        return totalResults;
    }
    public void setTotalResults(int totalResults) {
        this.totalResults = totalResults;
    }
}