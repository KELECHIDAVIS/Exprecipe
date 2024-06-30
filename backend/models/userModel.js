const mongoose  = require("mongoose")

const userSchema = mongoose.Schema({
    token:{
        type:String,
        required:[true, "Please Add Token"],
    },
}, {
    timestamps:true
})

module.exports = mongoose.model("User", userSchema)