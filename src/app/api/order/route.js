import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/ordersModel";
import { RestaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Allowed statuses
const ALLOWED_STATUSES = [
  "Preparing",
  "On the Way",
  "Delivered",
  "Failed to Deliver",
];

// POST - Create a new order
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

// GET - Fetch orders by userId
export async function GET(req) {
  const userId = req.nextUrl.searchParams.get("id");
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

export async function PATCH(req) {
  await mongoose.connect(connectionStr);

  try {
    const { orderId, status } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json({
        success: false,
        message: "Missing orderId or status",
      });
    }

    const ALLOWED_STATUSES = ["Preparing", "On the Way", "Delivered", "Failed to Deliver"];

    // Check if the new status is valid
    if (!ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json({
        success: false,
        error: `Invalid status. Allowed values: ${ALLOWED_STATUSES.join(", ")}`,
      });
    }

    const existingOrder = await orderSchema.findById(orderId);

    if (!existingOrder) {
      return NextResponse.json({ success: false, message: "Order not found" });
    }

    const currentStatus = existingOrder.status;

    // Define transition rules
    const VALID_TRANSITIONS = {
      "Preparing": ["On the Way"],
      "On the Way": ["Delivered", "Failed to Deliver"],
      "Delivered": [],
      "Failed to Deliver": [],
    };

    // Check if new status is allowed
    if (!VALID_TRANSITIONS[currentStatus].includes(status)) {
      return NextResponse.json({
        success: false,
        error: `Invalid transition from "${currentStatus}" to "${status}"`,
      });
    }

    // Perform update
    const updatedOrder = await orderSchema.findByIdAndUpdate(
      orderId,
      { status },
      { new: true, runValidators: true }
    );

    return NextResponse.json({ success: true, result: updatedOrder });
  } catch (err) {
    console.error("ORDER PATCH ERROR:", err.message);
    return NextResponse.json({ success: false, error: err.message });
  }
}
