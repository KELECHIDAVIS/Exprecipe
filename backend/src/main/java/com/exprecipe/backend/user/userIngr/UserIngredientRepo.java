package com.exprecipe.backend.user.userIngr;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface UserIngredientRepo extends JpaRepository<UserIngredient, Long> {
    Set<UserIngredient> findByUser_Id(Long id);
}
