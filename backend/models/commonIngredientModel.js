const mongoose = require("mongoose")

// every ingredient is associated with a user so this is how were gonna have to do it 
const commonIngredientSchema  = mongoose.Schema({
    name:{
        type:String, 
        required:[true, "Please add a text val "]
    },
    apiID:{
        type:String, 
        required: [true, "Please add a apiID "],
    },
    imagePath:{ // use default pic in case where there is no image 
        type:String, 
        required: [true, "Please add a image path "], // if no imagePath then we should give default
    },
}, {
    timestamps:false,
})

module.exports = mongoose.model("CommonIngredient", commonIngredientSchema)