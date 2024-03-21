const mongoose  = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Add Name"],
    },
    email:{
        type:String,
        required:[true, "Please Add Your Email"],
    },
    password:{
        type:String,
        required:[true, "Please Add Your Password"]
    }
}, {
    timestamps:true
})

module.exports = mongoose.model("User", userSchema)