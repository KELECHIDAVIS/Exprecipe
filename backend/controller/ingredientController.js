

const asyncHandler = require("express-async-handler")

const CommonIngredients = require('../models/commonIngredientModel')
const Ingredient = require("../models/ingredientModel")
//@desc     Get all user ingredients
//@route     GET /api/ingredients
//@access     Private
const getIngrs = asyncHandler ( async (req, res) =>{
    // find this user's specific ingredients
        
    try {
        const ingredients = await Ingredient.find({uuid: req.query.uuid}); 

        if(ingredients){
            res.status(200).json(ingredients) 
        }else{
            res.status(200).json([]) 
        }
    } catch (error) {
        res.status(500).json({message: "Couldn't Get Ingrs"}) 
    }
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
    try {
        const ingredients = await Ingredient.find({uuid:req.query.uuid}); 

        // now we have to format into a long, comma separated string: apples,salt,water... 
        let ingrQuery = ""
        for(let i = 0 ; i< ingredients.length; i++ ){
            ingrQuery+= ingredients[i].name; 
            if(i<ingredients.length-1)
                ingrQuery+=','
        }
        
        
        const fetch = require('node-fetch');

        const ignorePantry= true; // assume user has basic ingredients like salt, flour, and other stuff like that 
        const returnNum = 32 ; // how many recipes we are returning 
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
    } catch (error) {
        res.status(500).json({message: "Error in getPossibleRecipes"})
    }
    
})




//@desc     Get Recipe Info from spoonacular database
//@route     GET /api/ingredients/recipes/:id
//@access     Private
const getRecipeInfo = asyncHandler ( async (req, res) =>{
    
    try {
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
    } catch (error) {
        res.status(500).json({message:"Error in GetRecipeInfo"})
    }
})

//@desc     Set an ingredient for a user 
//@route     POST /api/ingredients
//@access     Private
const setIngr = asyncHandler ( async (req, res) =>{

    try {
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
                uuid:req.body.uuid, // attach this to current user 
            })
            res.status(200).json(ingredient)
        }
    } catch (error) {
        res.status(500).json({message:"Error when setting ingredient", error:error}); 
    }
    
    
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
        if(!req.body.uuid){
            res.status(401)
            throw new Error("User Not Found")
        }

        // make sure the logged in user matches the ingredient user 
        if(ingredient.uuid.toString() !== req.body.uuid){
            res.status(401)
            throw new Error("User not authorized")
        }
        
        
        await ingredient.deleteOne() 

        res.status(200).json({id: req.params.id})
})

module.exports = {
    getIngrs,
    setIngr,

    deleteIngr, 
    getCommonIngrs,
    getPossibleRecipes,
    getRecipeInfo
}