const mongoose = require("mongoose")

// every ingredient is associated with a user so this is how were gonna have to do it 
const ingredientSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User", // refering to the user model we made 
    },
    name:{
        type:String, 
        required:[true, "Please add a text val "]
    },
    imagePath:{ // use default pic in case where there is no image 
        type:String, 
        required: false, // if no imagePath then we should give default
    }
}, {
    timestamps:true,
})

module.exports = mongoose.model("Ingredient", ingredientSchema)