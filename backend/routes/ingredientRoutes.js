// the ingredients in each users pantry
const express = require("express");  
const router = express.Router(); 

const {getIngredients, setIngredient, updateIngredient, deleteIngredient} = require("../controllers/ingredientController")

//get and create
router.route("/").get(getIngredients).post(setIngredient)   ; 

//update and delete
router.route("/:id").put(updateIngredient).delete(deleteIngredient) ; 


module.exports = router 