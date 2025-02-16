package com.exprecipe.backend.ingredient;

import com.exprecipe.backend.recipe.Recipe;
import com.exprecipe.backend.user.User;
import jakarta.persistence.*;


import java.util.List;


@Entity
public class Ingredient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int spID; // api given ingredient id
    private String name;
    private String imageURL;
    private int amount;
    private String unit;

    @ElementCollection
    @CollectionTable(name = "possible_unit", joinColumns = @JoinColumn(name = "id")) // 2
    @Column(name = "possible_units") // 3
    private List<String> possibleUnits; // some ingrs have different possiblites. ex: 3 slices for pineapple or pinch of salt




    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user; // if inputted by user, recipe will be null

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "recipe_id")
    private Recipe recipe; // if coming from recipe, user will be null







    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public int getSpID() {
        return spID;
    }

    public void setSpID(int spID) {
        this.spID = spID;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
