const mongoose = require("mongoose")

const ingredientSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name:{
        type:String,
        required: [true, "Please add an ingredient name value"]
    }
}, {
    timestamps:true
})

module.exports = mongoose.model("Ingredient", ingredientSchema)