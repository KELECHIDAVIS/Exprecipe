const asyncHandler = require("express-async-handler")
const User = require("../models/userModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
//@desc     Get user Data 
//@route     GET /api/user/me
//@access     Private
const getMe = asyncHandler(async (req, res) =>{
    const {_id , name , email} = await User.findById (req.user.id)

    res.status(200).json({
        id: _id,
        name,
        email,
    })
})

//@desc     Login User
//@route     POST /api/user/login
//@access     Private
const loginUser = asyncHandler(async (req, res) =>{
    const {email, password} = req.body 
    
    //check for user email 
    const user = await User.findOne({email})

    // have to check the user and see if the password matches 
    if(user&&(await bcrypt.compare(password, user.password )) ){
        res.status(200).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error("Invalid Credentials")
    }
})


//@desc      Create new user 
//@route     POST /api/user/
//@access     Private
const registerUser = asyncHandler(async (req, res) =>{
    const {name , email, password} = req.body
    
    if(!name || !email || !password){
        throw new Error("Please add all fields"); 
    }

    // check if user exists alr 
    const userExists = await User.findOne({email})

    if(userExists)
    {
        res.status(400)
        throw new Error("User already exists under that email")
    }

    //hash password 
    const salt = await bcrypt.genSalt(10)
    const hashedPassword= await bcrypt.hash(password, salt); 

    //create user 
    const user = await User.create({
        name,
        email,
        password: hashedPassword 
    })

    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email, 
            token:generateToken(user._id),
        })
    }else{
        res.status(400)
        throw new Error("Invalid User Data")
    }
    
})

// generate jwt 
const generateToken = (id) =>{
    return  jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}
module.exports = {
    registerUser, 
    getMe, 
    loginUser, 
}