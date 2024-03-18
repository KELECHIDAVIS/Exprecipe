const express = require("express")
const router = express.Router()
const {getIngrs, setIngr, updateIngr, deleteIngr} = require("../controller/ingredientController")


router.get("/", getIngrs)
router.post("/", setIngr)
router.put("/:id", updateIngr)
router.delete("/:id", deleteIngr)

module.exports = router