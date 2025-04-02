package com.exprecipe.backend.user;

import com.exprecipe.backend.recipe.Recipe;
import com.exprecipe.backend.user.userIngr.UserIngredient;
import com.exprecipe.backend.user.userrecipe.UserRecipe;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.*;

@Entity
@Table(name = "\"user\"")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ElementCollection
    @CollectionTable(name = "diet_restriction", joinColumns = @JoinColumn(name = "id")) // 2
    @Column(name = "diet_restrictions") // 3
    private Set<String> dietRestrictions;
    private boolean premiumUser;
    private LocalDate createdAt;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserIngredient> pantry = new HashSet<>();

    @OneToMany (mappedBy="user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserRecipe> savedRecipes = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<String> getDietRestrictions() {
        return dietRestrictions;
    }

    public void setDietRestrictions(Set<String> dietRestrictions) {
        this.dietRestrictions = dietRestrictions;
    }

    public boolean isPremiumUser() {
        return premiumUser;
    }

    public void setPremiumUser(boolean premiumUser) {
        this.premiumUser = premiumUser;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public Set<UserIngredient> getPantry() {
        return pantry;
    }

    public void setPantry(Set<UserIngredient> pantry) {
        this.pantry = pantry;
    }

    public Set<UserRecipe> getSavedRecipes() {
        return savedRecipes;
    }

    public void setSavedRecipes(Set<UserRecipe> savedRecipes) {
        this.savedRecipes = savedRecipes;
    }
}
