const mongoose = require("mongoose")

const ingredientSchema = mongoose.Schema({
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