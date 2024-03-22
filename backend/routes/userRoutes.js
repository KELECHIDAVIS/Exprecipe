const express = require("express")
const router = express.Router()
const {getMe, registerUser , loginUser} = require("../controller/userController")

router.post("/", registerUser) // add user
router.post("/login", loginUser) // login user 
router.get("/me", getMe) // get user 

module.exports = router