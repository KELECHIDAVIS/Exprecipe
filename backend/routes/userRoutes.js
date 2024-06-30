const express = require("express")
const router = express.Router()
const { registerUser, loginUser } = require("../controller/userController")




router.post("/", registerUser) // add user
router.post("/login", loginUser) // add user



module.exports = router