const { default: mongoose } = require("mongoose");


const RestaurantModel = new mongoose.Schema({
    email: String,
    phone: String,
    name: String,
    city: String,
    fullAddress: String,
    password: String
})

export const RestaurantSchema = mongoose.models.restaurants || mongoose.model("restaurants", RestaurantModel)