const express = require("express")
const router = express.Router()
const {getMe, registerUser , loginUser} = require("../controller/userController")

const {protect}  = require("../middleware/authMiddleware")


router.post("/", registerUser) // add user
router.post("/login", loginUser) // login user 
router.get("/me", protect,  getMe) // get user  and protect the route 


module.exports = router