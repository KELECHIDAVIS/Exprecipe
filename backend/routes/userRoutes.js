const express = require("express")
const router = express.Router()
const {  loginUser } = require("../controller/userController")




router.post("/login", loginUser) // add user



module.exports = router