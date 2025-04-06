const { default: mongoose } = require("mongoose");


const userModel = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    city: String,
    address: String,
    password: String
})

export const userSchema = mongoose.models.users || mongoose.model("users", userModel);