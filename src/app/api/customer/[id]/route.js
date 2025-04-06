import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import { RestaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, context) {
    try {
        // ✅ Correctly access params.id
        const id = context.params?.id;

        if (!id) {
            return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
        }

        console.log("Fetching restaurant:", id);

        // ✅ Connect to MongoDB
        await mongoose.connect(connectionStr, {
            bufferCommands: false,
        });

        // ✅ Fetch restaurant details and food items
        const details = await RestaurantSchema.findOne({ _id: id });
        const foodItems = await foodSchema.find({ resto_id: id });

        return NextResponse.json({ success: true, details, foodItems });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
