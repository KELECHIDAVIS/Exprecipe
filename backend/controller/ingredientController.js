const asyncHandler = require("express-async-handler")

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

//@desc     Set an ingredient for a user 
//@route     POST /api/ingredients
//@access     Private
const setIngr = asyncHandler ( async (req, res) =>{

    if( !req.body.name ){
        throw new Error("Please Give The Ingredient A Name")
    }

    const ingredient = await Ingredient.create({
        name: req.body.name,
        user:req.user.id, // attach this to current user 
        imagePath: req.body.imagePath,
    })
    res.status(200).json(ingredient)
})

//@desc     Update an ingredient
//@route     PUT /api/ingredients/:id  // THE ID IS THE INGREDIENT ID
//@access     Private
const updateIngr = asyncHandler ( async (req, res) =>{

    const ingredient = await Ingredient.findById(req.params.id)
    if(!ingredient){
        res.status(400)
        throw new Error("Ingredient Not Found")
    }

    const user = await User.findById(req.user.id)
    
    // check for user 
    if(!user){
        res.status(401)
        throw new Error("User Not Found")
    }

    // make sure the logged in user matches the ingredient user 
    if(ingredient.user.toString() !== user.id){
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


    const user = await User.findById(req.user.id)
    
    // check for user 
    if(!user){
        res.status(401)
        throw new Error("User Not Found")
    }

    // make sure the logged in user matches the ingredient user 
    if(ingredient.user.toString() !== user.id){
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
}