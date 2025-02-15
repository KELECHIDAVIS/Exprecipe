package com.exprecipe.backend.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


// Has our business logic for users
@Service
public class UserService {
    private final UserRepo userRepo;

    @Autowired
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }


    public ResponseEntity<Object> newUser(User user) {
        userRepo.save(user);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

}
