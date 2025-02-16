package com.exprecipe.backend.user;

import com.exprecipe.backend.ingredient.Ingredient;
import com.exprecipe.backend.recipe.Recipe;
import jakarta.persistence.*;

import java.util.*;

@Entity
@Table(name = "\"user\"")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;


    @ElementCollection
    @CollectionTable(name = "diet_restriction", joinColumns = @JoinColumn(name = "id")) // 2
    @Column(name = "diet_restrictions") // 3
    private Set<String> dietRestrictions;
    private boolean premiumUser;
    private Date createdAt;

    @OneToMany(mappedBy ="user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ingredient> ingredients = new ArrayList<Ingredient>();

    @OneToMany(mappedBy ="user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Recipe> recipes = new ArrayList<Recipe>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
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

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }


}
