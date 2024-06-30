const express = require('express')
const dotenv = require("dotenv").config()
const {errorHandler} = require("./middleware/errorMiddleware")
const connectDB = require("./config/db")

const port = process.env.PORT || 5000 
connectDB()
const app= express()

// middleware
var cors = require('cors'); 
app.use (cors())    ; 
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/api/ingredients', require("./routes/ingredientRoutes"))
app.use('/api/recipes', require("./routes/recipeRoutes"))
app.use('/api/user', require("./routes/userRoutes"))
app.use(errorHandler) // error middleware 
app.listen(port, ()=> console.log(`Server Started On Port ${port}`))    

