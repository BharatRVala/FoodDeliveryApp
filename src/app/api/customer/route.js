import { connectionStr } from "@/app/lib/db"; 
import { RestaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
    let queryParams = req.nextUrl.searchParams;

    let city = queryParams.get("location");
    let name = queryParams.get("restaurant");

    let filter = {};

    if (city) {
        filter.city = { $regex: new RegExp(city, 'i') }; // case-insensitive city
    }

    if (name) {
        filter.name = { $regex: new RegExp(name, 'i') }; // case-insensitive name
    }

    await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

    let result = await RestaurantSchema.find(filter);  

    return NextResponse.json({ success: true, result }); 
}
