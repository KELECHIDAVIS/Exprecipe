
//@desc     Get all user ingredients
//@route     GET /api/ingredients
//@access     Private
const getIngrs = (req, res) =>{
    res.status(200).json({"message": "Get Ingredients"})
}

//@desc     Set an ingredient for a user 
//@route     POST /api/ingredients
//@access     Private
const setIngr = (req, res) =>{
    res.status(200).json({"message": "Set Ingredient"})
}

//@desc     Update an ingredient
//@route     PUT /api/ingredients/:id
//@access     Private
const updateIngr = (req, res) =>{
    res.status(200).json({"message": "Update Ingredient"})
}

//@desc     Delete an ingredient from user data
//@route     DELETE /api/ingredients/:id
//@access     Private
const deleteIngr = (req, res) =>{
    res.status(200).json({"message": "Delete Ingredient"})
}

module.exports = {
    getIngrs,
    setIngr,
    updateIngr,
    deleteIngr, 
}