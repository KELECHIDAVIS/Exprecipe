const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")




//@desc     Login User
//@route     POST /api/user/login
//@access     Private
const loginUser = asyncHandler(async (req, res) =>{
    const userToken = req.body.token
    
    // find user
    const user = await User.findOne({token: userToken});
    
    if(user){// user exists
        res.status(201).json({
            _id:user._id,
            token: userToken,
        })
    }else{ // create new user 
        const newUser = await User.create({token: userToken}); 
        if(newUser){
            
            res.status(201).json({
                _id:newUser._id,
                token: userToken,
            })
        }else{ // failed to create user 
            res.status(500).json({message: "Failed To Create User"})
            throw new Error("Failed To Create User")
        }
    }   
    
})

module.exports = {
    loginUser, 
}