const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")



//@desc      Create new user 
//@route     POST /api/user/
//@access     Public
const registerUser = asyncHandler(async (req, res) =>{
    
    const {token} = req.body
    
    if(!token){
        throw new Error("Token Isn't Present"); 
    }

    // check if user exists alr 
    const userExists = await User.findOne({token})

    if(userExists)
    {
        res.status(400)
        throw new Error("User already exists under that token")
    }

    

    //create user 
    const user = await User.create({
        token,
    })

    if(user){
        res.status(201).json({
            _id:user.id,
            token:token,
        })
    }else{
        res.status(400)
        throw new Error("Invalid User Data")
    }
    
})
//@desc     Login User
//@route     POST /api/user/login
//@access     Private
const loginUser = asyncHandler(async (req, res) =>{
    const {token} = req.body 
    
    if(!token){
        throw new Error("Token Isn't Present"); 
    }
    //check for user email 
    const user = await User.findOne({token})
    if(user){
        res.status(200).json({
            _id:user.id,
            token: user.token,
        })
    }else{
        
        res.status(400); 
        throw new Error("Invalid User"); 
    }
})

module.exports = {
    registerUser, 
    loginUser, 
}