const express = require("express")
const router = express.Router()
const {getIngrs, setIngr, updateIngr, deleteIngr} = require("../controller/ingredientController")

const {protect} = require("../middleware/authMiddleware")
// all these routes pertain to a certain user so should be protected by the protect middleware  

router.get("/", protect, getIngrs)
router.post("/",  protect,setIngr)
router.put("/:id",  protect,updateIngr)
router.delete("/:id", protect, deleteIngr)

module.exports = router