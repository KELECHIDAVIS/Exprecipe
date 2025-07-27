package com.exprecipe.backend.ingredient;



import com.exprecipe.backend.user.UserService;
import com.exprecipe.backend.user.userIngr.UserIngredient;
import com.exprecipe.backend.user.userIngr.UserIngredientService;
import com.exprecipe.backend.user.UserRepo;
import com.exprecipe.backend.user.User; 

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import io.github.bucket4j.Bucket;
import io.github.bucket4j.ConsumptionProbe;


@RestController
@RequestMapping("/api/v1/user")

public class IngredientController {
    private final UserService userService;
    private final IngredientService ingredientService;
    private final UserIngredientService userIngredientService;
    private PricingPlanService pricingPlanService; 
    private final UserRepo userRepo; 
    @Autowired
    public IngredientController(UserRepo userRepo, UserService userService, IngredientService ingredientService, UserIngredientService userIngredientService) {
        this.userService = userService;
        this.ingredientService = ingredientService;
        this.userIngredientService = userIngredientService;
        this.userRepo = userRepo; 
        // set scan limit based on user's status 
        
    }

    /*
    GET all user ingredients
    @return a list of ingredients associated with input user
     */
    @GetMapping("/{userId}/ingredient")
    public ResponseEntity<Set<UserIngredient>> getUserIngredients(@PathVariable(value= "userId") Long userId) {
        return userIngredientService.getUserPantry(userId);
    }

    /*
    POST create ingredient associated with inputted user
    @returns created ingredient
     */
    @PostMapping("/{userId}/ingredient")
    public ResponseEntity<UserIngredient> createUserIngredient(@PathVariable(value= "userId") Long userId, @RequestBody SpoonacularIngredient spIngredient) {
        return userIngredientService.saveIngredientToPantry(userId, spIngredient);
    }

    @PostMapping("/{userId}/ingredient/list")
    public ResponseEntity<List<UserIngredient>> addListOfIngredients(@PathVariable Long userId, @RequestBody List<String> ingrNames) {
        System.out.println("Given List: "+ ingrNames);
        ResponseEntity<List<UserIngredient>> response =  userIngredientService.addListOfIngredients(userId, ingrNames);
        System.out.println("Response: "+ response.getBody());
        return response; 
    }
    /*
    DELETE specified ingredient user ingredient
    @returns a string confirming deletion
     */
    @DeleteMapping("/{userId}/ingredient/{ingredientId}")
    public ResponseEntity<String> deleteUserIngredient(@PathVariable(value= "userId") Long userId, @PathVariable(value= "ingredientId") Long ingredientId) {
        return userIngredientService.deleteIngredient(ingredientId);
    }

    /*
    PUT update specified ingredient
     */
    @PutMapping("/{userId}/ingredient/{ingredientId}")
    public ResponseEntity<UserIngredient> updateIngredient(@RequestBody UserIngredient ingredient) {
        return userIngredientService.updateIngredient(ingredient);
    }




    /*
    POST detects ingredients within inputted image and returns a list of detected ingredient names as a comma separated string
    IT'S RATE LIMITED PER USER, AVG USERS GET 3 CALLS PER DAY, PREMIUM GET 10
    */
    @PostMapping("/{userID}/ingredient/detect")
    public ResponseEntity<String> detectIngredientsInImage(@PathVariable(value="userID") Long userID ,@RequestPart("image") MultipartFile imageFile) {
        
//        // get user premium status in string form
//        Optional<User> userOpt = userRepo.findById(userID);
//
//        if(userOpt.isEmpty())
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body( "User Doesn't Exist ");
//
//        boolean isPremium = userOpt.get().isPremiumUser();
//
//        pricingPlanService = new PricingPlanService();
//        Bucket bucket = pricingPlanService.resolveBucket(Boolean.toString(isPremium));
//        ConsumptionProbe probe = bucket.tryConsumeAndReturnRemaining(1);
//
//        // can also return the amount of calls remaining for user but not neccesary for now
//        if (probe.isConsumed()) {
//            try{
//                System.out.println("Detection Function was successfully called");
//                ResponseEntity<String> detectionResponse =  ingredientService.detectIngredientsInImage(imageFile);
//                System.out.println(detectionResponse.getBody());
//                return detectionResponse;
//            }catch (Exception e) {
//                System.out.println("Detection Function error catch");
//                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body( "Error Detecting Ingredients: "+e.getMessage());
//            }
//        }
//
//
//
//        //long waitForRefill = probe.getNanosToWaitForRefill() / 1_000_000_000;
//        System.out.println("Probe said there were to many calls from this user already");
//        return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
//            //.header("X-Rate-Limit-Retry-After-Seconds", String.valueOf(waitForRefill))
//            .body("You Have Exceeded Your Scan Limit For Today. Upgrade To Premium For More Daily Usage!");



            try{
                System.out.println("Detection Function was successfully called");
                ResponseEntity<String> detectionResponse =  ingredientService.detectIngredientsInImage(imageFile);
                System.out.println(detectionResponse.getBody());
                return detectionResponse;
            }catch (Exception e) {
                System.out.println("Detection Function error catch");
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body( "Error Detecting Ingredients: "+e.getMessage());
            }
    }

    @GetMapping("/{user}/ingredient/search")
    public ResponseEntity<SpoonacularIngredient[]> searchIngredients( @RequestParam String search) {
       return ingredientService.ingredientSearch(search ,3 ); // 3 by default
    }


}
