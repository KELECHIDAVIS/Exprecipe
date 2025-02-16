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


}
