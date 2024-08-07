const mongoose = require("mongoose")

// every ingredient is associated with a user so this is how were gonna have to do it 
const recipeSchema = mongoose.Schema({
    uuid:{
        type:String, 
        required:[true, "Please add a uuid val "]
    },
    name:{
        type:String, 
        required:[true, "Please add a text val "]
    },
    cookTime:{ // use default pic in case where there is no image 
        type:Number, 
        required: [true, "Please add a image path "], // if no imagePath then we should give default
    },
    apiID:{
        type:String, 
        required: [true, "Please add a apiID "],
    },
    ingredients:{
        type:Array,
        required:[true, 'Please add ingredients array']
    },
    instructions:{
        type:String, 
        
    },
    image:{
        type:String, 
        required:[true, "Please add an image "]
    },
    sourceUrl:{
        type:String, 
        required:[true, "Please add a website url  "]
    },
}, {
    timestamps:true,
})

module.exports = mongoose.model("Recipe", recipeSchema)