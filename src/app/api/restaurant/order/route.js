import { connectionStr } from "@/app/lib/db";
import { RestaurantSchema } from "@/app/lib/restaurantsModel";
import { orderSchema } from "@/app/lib/ordersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await mongoose.connect(connectionStr);
    
    const { searchParams } = new URL(req.url);
    const restaurantId = searchParams.get("id");
    
    if (!restaurantId) {
      return NextResponse.json(
        { success: false, message: "Restaurant ID is required" },
        { status: 400 }
      );
    }

    // Verify restaurant exists
    const restaurant = await RestaurantSchema.findById(restaurantId);
    if (!restaurant) {
      return NextResponse.json(
        { success: false, message: "Restaurant not found" },
        { status: 404 }
      );
    }

    // Get all orders for this restaurant
    const orders = await orderSchema.find({ resto_id: restaurantId })
      .sort({ createdAt: -1 }) // Newest first
      .populate('user_Id', 'name email') // Add customer details
      .populate('deliveryBoy_id', 'name phone'); // Add delivery boy details

    return NextResponse.json({
      success: true,
      restaurant: {
        _id: restaurant._id,
        name: restaurant.name,
        email: restaurant.email,
        phone: restaurant.phone,
        address: restaurant.fullAddress
      },
      orders: orders.map(order => ({
        _id: order._id,
        customer: order.user_Id,
        deliveryBoy: order.deliveryBoy_id,
        foodItems: order.foodNames,
        amount: order.amount,
        status: order.status,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt
      }))
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}