package com.exprecipe.backend.ingredient;

import com.exprecipe.backend.user.User;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

//In Some Cases We don't want to pass all the data when creating
public class IngredientDto {
    private int id;
    private String name;
    private String imageURL;
    private int spID; // api given ingredient id
    private User user; // might not have to be given on creation
}
