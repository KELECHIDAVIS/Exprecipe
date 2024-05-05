const express = require("express")
const router = express.Router()
const {getSavedRecipes, deleteRecipe, saveRecipe} = require('../controller/recipeController')

const {protect} = require("../middleware/authMiddleware")
// all these routes pertain to a certain user so should be protected by the protect middleware  

router.get("/", protect, getSavedRecipes)

router.post("/",  protect,saveRecipe)

router.delete("/:id", protect, deleteRecipe)

module.exports = router