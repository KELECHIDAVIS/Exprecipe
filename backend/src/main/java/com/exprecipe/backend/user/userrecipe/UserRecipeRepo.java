package com.exprecipe.backend.user.userrecipe;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface UserRecipeRepo extends JpaRepository<UserRecipe, Long> {
    Set<UserRecipe> findByUser_Id(Long id);
}
