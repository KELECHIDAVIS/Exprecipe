import java.util.List;

public class RecipeResponse {
    private List<RpdRecipeSearchByIngr> results; 
    private Integer offset; 
    private Integer number; 
    private Integer totalResults;

    // Getter and Setter for results
    public List<RpdRecipeSearchByIngr> getResults() {
        return results;
    }

    public void setResults(List<RpdRecipeSearchByIngr> results) {
        this.results = results;
    }

    // Getter and Setter for offset
    public Integer getOffset() {
        return offset;
    }

    public void setOffset(Integer offset) {
        this.offset = offset;
    }

    // Getter and Setter for number
    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    // Getter and Setter for totalResults
    public Integer getTotalResults() {
        return totalResults;
    }

    public void setTotalResults(Integer totalResults) {
        this.totalResults = totalResults;
    }
}
