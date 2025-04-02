package com.exprecipe.backend.user.userrecipe;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserRecipeService {
    private final UserRecipeRepo userRecipeRepo;


    public UserRecipeService(UserRecipeRepo userRecipeRepo) {
        this.userRecipeRepo = userRecipeRepo;
    }

}
