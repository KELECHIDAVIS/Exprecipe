const asyncHandler = require('express-async-handler')


const Ingredient = require("../models/ingredientModel")
// Gets goals (only the specific user goal after auth )
//route: GET /api/goals
//access: Private 
const getIngredients = asyncHandler(async (req, res) =>{
    const ingredients = await Ingredient.find() 

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
        name: req.body.name
    })
    res.status(200).json(ingredient); 
})

// Update ingredient
//route: PUT /api/goals/:id
//access: Private 
const updateIngredient =  asyncHandler(async (req, res) =>{


    try {
        const ingredientId = req.params.id; 
        const updatedName = req.body.name; 
        let ingredient = await Ingredient.findOneAndUpdate({_id:ingredientId}, {name:updatedName})

        ingredient = await Ingredient.findOne({_id:ingredientId}); 
        console.log(ingredient) ; 
        res.status(200).json({ingredient}); 
    
    } catch (error) {
        console.error(error); 
        res.status(500).json({message:"Something Went Wrong When Trying To Update That Ingredient"})
    }
})


// Delete goal 
//route: GET /api/goals/:id
//access: Private 
const deleteIngredient =  asyncHandler(async (req, res) =>{
    try {
        const ingredientId = req.params.id; 
        
        let ingredient = await Ingredient.deleteOne({_id:ingredientId})

        console.log(ingredient) ; 
        res.status(200).json({message:`Ingredient with id ${ingredientId} has been deleted`}); 
    
    } catch (error) {
        console.error(error); 
        res.status(500).json({message:"Something Went Wrong When Trying To Delete That Ingredient"})
    }
})

module.exports = {
    getIngredients, setIngredient, updateIngredient, deleteIngredient
}