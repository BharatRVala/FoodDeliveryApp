import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/ordersModel";
import { RestaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Create new order
export async function POST(req) {
  const payload = await req.json();
  await mongoose.connect(connectionStr, { useNewUrlParser: true });

  let success = false;
  let indiaTime = null;

  const orderObj = new orderSchema(payload);
  const result = await orderObj.save();

  if (result) {
    success = true;
    indiaTime = new Date(result.createdAt).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
  }

  return NextResponse.json({ result, success, indiaTime });
}

// Get orders by customer ID
export async function GET(req) {
  const userId = req.nextUrl.searchParams.get('id');
  let success = false;

  await mongoose.connect(connectionStr, { useNewUrlParser: true });

  let result = await orderSchema.find({ user_Id: userId }).sort({ _id: -1 });

  if (result && result.length > 0) {
    let restoData = await Promise.all(
      result.map(async (item) => {
        let restoInfo = {};
        const resto = await RestaurantSchema.findOne({ _id: item.resto_id });

        restoInfo.data = resto;
        restoInfo.amount = item.amount;
        restoInfo.status = item.status;
        restoInfo.foodNames = item.foodNames;
        restoInfo.createdAtIST = new Date(item.createdAt).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
        });

        return restoInfo;
      })
    );

    result = restoData;
    success = true;
  }

  return NextResponse.json({ result, success });
}

// Update order status
export async function PATCH(req) {
  try {
    const { orderId, status } = await req.json();
    await mongoose.connect(connectionStr);

    const updatedOrder = await orderSchema.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ success: false, message: "Order not found" });
    }

    return NextResponse.json({ success: true, result: updatedOrder });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message });
  }
}
