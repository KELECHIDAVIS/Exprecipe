package com.exprecipe.backend.user;

import com.exprecipe.backend.ingredient.Ingredient;
import com.exprecipe.backend.recipe.Recipe;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;


// Has our business logic for users
@Service
public class UserService {
    private final UserRepo userRepo;

    @Autowired
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }


    public ResponseEntity<Object> newUser() {
        //Create and empty new user
        User user = new User();

        user.setPremiumUser(false);
        user.setDietRestrictions(new HashSet<>());
        user.setCreatedAt(LocalDate.now());

        User savedUser = userRepo.save(user);
        return ResponseEntity.ok(savedUser);
    }
    @Transactional // so that we can see the instructions of recipes
    public ResponseEntity<User> getUserById(long id) {
        Optional<User> user = userRepo.findById(id);
        if (user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @Transactional
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userRepo.findAll(), HttpStatus.OK);
    }

    public ResponseEntity<User> deleteUser(Long id) {
        try{
            userRepo.deleteById(id);
        }catch(EmptyResultDataAccessException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
