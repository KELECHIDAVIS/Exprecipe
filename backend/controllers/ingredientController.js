const asyncHandler = require('express-async-handler')


const Ingredient = require("../models/ingredientModel")
const User = require('../models/userModel')
// Gets goals (only the specific user goal after auth )
//route: GET /api/goals
//access: Private 
const getIngredients = asyncHandler(async (req, res) =>{
    const ingredients = await Ingredient.find({user: req.user.id}) 

    res.status(200).json(ingredients); 
})

// Sets goals 
//route: POST /api/goals
//access: Private 
const setIngredient =  asyncHandler(async (req, res) =>{
    
    
    if (!req.body.name) {
        res.status(400)
        throw new Error('Please add a name when creating ingredient')
    }

   
    const ingredient = await Ingredient.create({
        name: req.body.name,
        user: req.user.id
    })
    res.status(200).json(ingredient); 
})

// Update ingredient
//route: PUT /api/goals/:id
//access: Private 
const updateIngredient =  asyncHandler(async (req, res) =>{

    const ingredient = await Ingredient.findById(req.params.id); 

    if(!ingredient)
    {
        res.status(400); 
        throw new Error("Ingredient Not found"); 
    }

    const user = await User.findById(req.user.id);

    // check for user 
    if(!user){
        res.status(401); 
        throw new Error("User not found"); 
    }

    // make sure logged in user matches the ingredient user
    if(ingredient.user.toString() !== user.id){
        res.status(401); 
        throw new Error("User not authorized"); 
    }



    const updatedIngredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true,})

    res.status(200).json(updatedIngredient); 
})


// Delete goal 
//route: GET /api/goals/:id
//access: Private 
const deleteIngredient =  asyncHandler(async (req, res) =>{
    const ingredient = await Ingredient.findById(req.params.id); 

    if(!ingredient) {
        res.status(400) ; 
        throw new Error("Goal Not Found"); 
    }

    const user = await User.findById(req.user.id);

    // check for user 
    if(!user){
        res.status(401); 
        throw new Error("User not found"); 
    }

    // make sure logged in user matches the ingredient user
    if(ingredient.user.toString() !== user.id){
        res.status(401); 
        throw new Error("User not authorized"); 
    }


    await ingredient.deleteOne(); 

    res.status(200).json({id: req.params.id}); 

})

module.exports = {
    getIngredients, setIngredient, updateIngredient, deleteIngredient
}