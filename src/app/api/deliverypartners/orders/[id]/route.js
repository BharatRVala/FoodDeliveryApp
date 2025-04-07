import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/ordersModel";
import { RestaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    const id = res.params.id;
    let success = false;
  
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
  
    let result = await orderSchema.find({ deliveryBoy_id: id });
  
    if (result) {
      // 🔽 Sort orders by createdAt DESC (latest first)
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  
      let restoData = await Promise.all(
        result.map(async (item) => {
          let restoInfo = {};
          restoInfo.data = await RestaurantSchema.findOne({ _id: item.resto_id });
          restoInfo.foodNames = item.foodNames;
          restoInfo.amount = item.amount;
          restoInfo.status = item.status;
          restoInfo.orderId = item._id;
          restoInfo.createdAtIST = new Date(item.createdAt).toLocaleString(
            "en-IN",
            { timeZone: "Asia/Kolkata" }
          );
  
          return restoInfo;
        })
      );
  
      result = restoData;
      success = true;
    }
  
    return NextResponse.json({ result, success });
  }
  
