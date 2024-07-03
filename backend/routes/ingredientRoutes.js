const express = require("express")
const router = express.Router()
const {getIngrs, setIngr,  deleteIngr, getCommonIngrs,getPossibleRecipes , getRecipeInfo} = require("../controller/ingredientController")

// all these routes pertain to a certain user so should be protected by the protect middleware  

router.get("/common", getCommonIngrs) // common should be able to be acessed by anyone 
router.get("/",getIngrs)
router.get("/recipes",getPossibleRecipes)
router.get("/recipes/:id", getRecipeInfo)
router.post("/",setIngr)
router.delete("/:id", deleteIngr)

module.exports = router