

const asyncHandler = require("express-async-handler")

const CommonIngredients = require('../models/commonIngredientModel')
const Ingredient = require("../models/ingredientModel")
const User = require("../models/userModel")
//@desc     Get all user ingredients
//@route     GET /api/ingredients
//@access     Private
const getIngrs = asyncHandler ( async (req, res) =>{
    // find this user's specific ingredients
    const ingredients = await Ingredient.find({user: req.user.id}); 

    res.status(200).json(ingredients) 
})

//@desc     Get 5000 of the most common ingredients from spoonacular 
//@route     GET /api/ingredients/common
//@access     Public
const getCommonIngrs = asyncHandler ( async (req, res) =>{
    
    const ingredients = await CommonIngredients.find(); 

    res.status(200).json(ingredients) 
})


//@desc     Get user's possible recipes from spoonacular 
//@route     GET /api/ingredients/recipes
//@access     Private
const getPossibleRecipes = asyncHandler ( async (req, res) =>{
    // Get list of ingredients (should be a list of objects)
    const ingredients = await Ingredient.find({user:req.user.id}); 


    // now we have to format into a long, comma separated string: apples,salt,water... 
    let ingrQuery = ""
    for(let i = 0 ; i< ingredients.length; i++ ){
        ingrQuery+= ingredients[i].name; 
        if(i<ingredients.length-1)
            ingrQuery+=','
    }
    
    
    const fetch = require('node-fetch');

    const ignorePantry= true; // assume user has basic ingredients like salt, flour, and other stuff like that 
    const returnNum = 5 ; // how many recipes we are returning 
    const ranking =2 ;  // 1) maximize ingredients 2) minimize missing ingredients 

    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${ingrQuery}&number=${returnNum}&ignorePantry=${true}&ranking=${ranking}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.RAPID_API_HOST
      }
    };
    
 
    const response = await fetch(url, options);
    const json = await response.json();


    res.status(response.status).json(json)
    
})




//@desc     Get Recipe Info from spoonacular database
//@route     GET /api/ingredients/recipes/:id
//@access     Private
const getRecipeInfo = asyncHandler ( async (req, res) =>{
    
    // make call by recipe id to spoonacular 

    const fetch = require('node-fetch');

    const url = `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${req.params.id}/information`;
    const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.RAPID_API_HOST
    }
    };

    const response = await fetch(url, options);
    const json = await response.json();

    res.status(response.status).json(json); 
})

//@desc     Set an ingredient for a user 
//@route     POST /api/ingredients
//@access     Private
const setIngr = asyncHandler ( async (req, res) =>{

    if( !req.body.name ){
        res.status(400)
        throw new Error("Please Give The Ingredient A Name")
    }

    // first find the actual ingredient counterPart from commonIngredients Collection

    const nameRegex = new RegExp(req.body.name.toLowerCase())
    const commonIngredient = await CommonIngredients.findOne({name: {$regex:nameRegex, $options: 'i'}}); 
   
    if(!commonIngredient){
        throw new Error ("Ingredient Not Found. Recheck Ingredient Spelling")
    }else{
        const ingredient = await Ingredient.create({
            name: commonIngredient.name,
            imagePath: commonIngredient.imagePath,
            apiID: commonIngredient.apiID, 
            user:req.user.id, // attach this to current user 
        })
        res.status(200).json(ingredient)
    }
    
    
})

//@desc     Update an ingredient
//@route     PUT /api/ingredients/:id // THIS IS THE INGREDIENT ID 
//@access     Private
const updateIngr = asyncHandler ( async (req, res) =>{

    const ingredient = await Ingredient.findById(req.params.id)
    if(!ingredient){
        res.status(400)
        throw new Error("Ingredient Not Found")
    }
    
    // check for user 
    if(!req.user){
        res.status(401)
        throw new Error("User Not Found")
    }

    // make sure the logged in user matches the ingredient user 
    if(ingredient.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("User not authorized")
    }
    
    
    const updatedIngredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, {
        new:true
    })

    res.status(200).json(updatedIngredient)
})

//@desc     Delete an ingredient from user data
//@route     DELETE /api/ingredients/:id
//@access     Private
const deleteIngr = asyncHandler ( async (req, res) =>{
    const ingredient = await Ingredient.findById(req.params.id)
    if(!ingredient){
        res.status(400)
        throw new Error("Ingredient Not Found")
    }


    
    // check for user 
    if(!req.user){
        res.status(401)
        throw new Error("User Not Found")
    }

    // make sure the logged in user matches the ingredient user 
    if(ingredient.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("User not authorized")
    }
    
    
    await ingredient.deleteOne() 

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getIngrs,
    setIngr,
    updateIngr,
    deleteIngr, 
    getCommonIngrs,
    getPossibleRecipes,
    getRecipeInfo
}