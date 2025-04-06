const { default: mongoose } = require("mongoose");


const deliveryPartnersModel = new mongoose.Schema({
    name: String,
    mobile: String,
    city: String,
    address: String,
    password: String
})

export const deliveryPartnersSchema = mongoose.models.deliverypartners || mongoose.model("deliverypartners", deliveryPartnersModel);