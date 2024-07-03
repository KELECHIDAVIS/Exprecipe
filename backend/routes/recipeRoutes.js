const express = require("express")
const router = express.Router()
const {getSavedRecipes, deleteRecipe, saveRecipe} = require('../controller/recipeController')

// all these routes pertain to a certain user so should be protected by the protect middleware  

router.get("/", getSavedRecipes)

router.post("/",   saveRecipe)

router.delete("/:id", deleteRecipe)

module.exports = router