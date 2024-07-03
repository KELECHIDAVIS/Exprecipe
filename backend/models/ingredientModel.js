const mongoose = require("mongoose")

// every ingredient is associated with a user so this is how were gonna have to do it 
const ingredientSchema = mongoose.Schema({
    uuid:{
        type:String, 
        required:[true, "Please add a uuid val "]
    },
    name:{
        type:String, 
        required:[true, "Please add a text val "]
    },
    imagePath:{ // use default pic in case where there is no image 
        type:String, 
        required: [true, "Please add a image path "], // if no imagePath then we should give default
    },
    apiID:{
        type:String, 
        required: [true, "Please add a apiID "],
    }
}, {
    timestamps:true,
})

module.exports = mongoose.model("Ingredient", ingredientSchema)