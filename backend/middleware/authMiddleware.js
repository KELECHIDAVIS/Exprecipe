// protects our routes 
const asyncHandler = require('express-async-handler')
const User= require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get token from header 
            token = req.headers.authorization.split(' ') [1]

            // verify token 
            if(token !== 'null' && token){

                
    
                // get user from token
                req.user = await User.findOne({token}) 
                console.log("User from auth middleware: ", req.user); 
                
            }

            next() // call next middleware 

        } catch (error) {
            console.log(error)
            res.status(401) 
            throw new Error("Not Authorized")
        }

    }
    if(!token){
        res.status(401) 
        throw new Error("Not Authorized: No Token"); 
    }
}) 

module.exports = {
    protect,
}