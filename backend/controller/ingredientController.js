const asyncHandler = require("express-async-handler")

const Ingredient = require("../models/ingredientModel")
//@desc     Get all user ingredients
//@route     GET /api/ingredients
//@access     Private
const getIngrs = asyncHandler ( async (req, res) =>{
    const ingredients = await Ingredient.find(); 

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
        name: req.body.name
    })
    res.status(200).json(ingredient)
})

//@desc     Update an ingredient
//@route     PUT /api/ingredients/:id
//@access     Private
const updateIngr = asyncHandler ( async (req, res) =>{

    const ingredient = await Ingredient.findById(req.params.id)
    if(!ingredient){
        res.status(400)
        throw new Error("Ingredient Not Found")
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

    await ingredient.deleteOne() 

    res.status(200).json({id: req.params.id})
})

module.exports = {
    getIngrs,
    setIngr,
    updateIngr,
    deleteIngr, 
}