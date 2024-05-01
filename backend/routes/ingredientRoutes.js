const express = require("express")
const router = express.Router()
const {getIngrs, setIngr, updateIngr, deleteIngr, getCommonIngrs,getPossibleRecipes , getRecipeInfo} = require("../controller/ingredientController")

const {protect} = require("../middleware/authMiddleware")
// all these routes pertain to a certain user so should be protected by the protect middleware  

router.get("/common", getCommonIngrs) // common should be able to be acessed by anyone 
router.get("/", protect, getIngrs)
router.get("/recipes",protect, getPossibleRecipes)
router.get("/recipes/:id",protect, getRecipeInfo)
router.post("/",  protect,setIngr)
router.put("/:id",  protect,updateIngr)
router.delete("/:id", protect, deleteIngr)

module.exports = router