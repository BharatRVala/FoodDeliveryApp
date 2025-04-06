const { default: mongoose } = require("mongoose");


const orderModel = new mongoose.Schema({
    user_Id: mongoose.Schema.Types.ObjectId,
    foodItemsIds: String,
    foodNames:String,
    resto_id: mongoose.Schema.Types.ObjectId,
    deliveryBoy_id: mongoose.Schema.Types.ObjectId,
   
    amount: String,
    status: {
      type: String,
      enum: ["Preparing", "On the Way", "Delivered", "confirm"],
      default: "Preparing"
    },
},
{
    timestamps: true 
  })

export const orderSchema = mongoose.models.orders || mongoose.model("orders", orderModel);