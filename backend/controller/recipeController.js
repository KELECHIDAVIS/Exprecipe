const asyncHandler = require("express-async-handler")

const Recipe = require("../models/recipeModel")
//@desc     Get user's saved recipes  
//@route     GET /api/recipes
//@access     Private
const getSavedRecipes = asyncHandler ( async (req, res) =>{
    try {
        const recipes = await Recipe.find({uuid: req.query.uuid}); 

        res.status(200).json(recipes) 
    } catch (error) {
        res.status(500).json({message:"Error in getSavedRecipes"}) ; 
    }
})

//@desc     Save a new Recipe  
//@route     POST /api/recipes
//@access     Private
const saveRecipe = asyncHandler(async (req, res) => {
    const { name, cookTime, ingredients, instructions, sourceUrl, apiID, image } = req.body;
    // console.log("saveRecipe- enter function, recipeinfo: ", { name, cookTime, ingredients, instructions, sourceUrl, apiID, image })
    
    if ( !name || !cookTime || !ingredients || !sourceUrl || !apiID || !image) {
        console.log("Error in save recipe in recipe controller: ");
        res.status(400); 
        throw new Error("Please Add All Fields"); 
    }
    
    const recipeAlrSaved = await Recipe.findOne({ apiID : apiID, uuid:req.body.uuid});  // have to make it personalized to user 
    
    if (recipeAlrSaved) {
        console.log("recipe was alr saved");
        res.status(400); 
        throw new Error("Recipe was already saved"); 
    }
    
    
    // save recipe 
    const recipe = await Recipe.create({
        uuid: req.body.uuid,
        name:name,
        cookTime:cookTime,
        apiID:apiID, 
        ingredients:ingredients,
        instructions: instructions !== undefined ? instructions : null,
        image:image, 
        sourceUrl:sourceUrl,
    });
    res.status(200).json(recipe);
});

//@desc     Get user's saved recipes  
//@route     DELETE /api/recipes/:id
//@access     Private
const deleteRecipe = asyncHandler ( async (req, res) =>{
   
    const recipe = await Recipe.findById(req.params.id) ;

    if(!recipe){
        res.status(400) 
        throw new Error("Recipe not found"); 
    }

    // check for user 
     if(!req.body.uuid){
        res.status(401)
        throw new Error("User uuid Not Found")
    }

    // make sure the logged in user matches the ingredient user 
    if(recipe.uuid !== req.body.uuid){
        res.status(401)
        throw new Error("User not authorized")
    }

    await recipe.deleteOne(); 
    res.status(200).json({id: req.params.id}) 
})

module.exports = {
    getSavedRecipes, 
    saveRecipe,
    deleteRecipe,
}