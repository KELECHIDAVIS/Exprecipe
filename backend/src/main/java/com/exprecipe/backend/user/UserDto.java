package com.exprecipe.backend.user;

import com.exprecipe.backend.ingredient.Ingredient;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Data
public class UserDto {
    private Integer id;
    private Set<String> dietRestrictions;
    private boolean premiumUser;
    private Date createdAt;
    private List<Ingredient> ingredients = new ArrayList<Ingredient>();

}
