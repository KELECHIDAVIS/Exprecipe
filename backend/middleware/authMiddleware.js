// protects our routes 
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User= require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get token from header 
            token = req.headers.authorization.split(' ') [1]
            
            
            if(token!== 'null' && token){
                // verify token 
                const secret = process.env.JWT_SECRET
                const decoded = jwt.verify(token, secret)   

                // get user from token
                req.user = await User.findById(decoded.id).select('-password')  
            
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