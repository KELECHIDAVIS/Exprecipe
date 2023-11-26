// the ingredients in each users pantry
const express = require("express");  
const router = express.Router(); 

const {getIngredients, setIngredient, updateIngredient, deleteIngredient} = require("../controllers/ingredientController")

const {protect} = require("../middleware/authMiddleware"); 

// all these are specific and private to the user becase of the protect middleware 
//get and create
router.route("/").get(protect,getIngredients).post(protect,setIngredient)   ; 

//update and delete
router.route("/:id").put(protect,updateIngredient).delete(protect,deleteIngredient) ; 


module.exports = router 