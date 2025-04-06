import { connectionStr } from "@/app/lib/db";
import { RestaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await mongoose.connect(connectionStr,{useNewUrlParser:true});
        
        let result = await RestaurantSchema.find().select('city');
        
        const cities = result
            .filter(item => item.city && typeof item.city === 'string') // Ensure city exists and is a string
            .map(item => {
                const city = item.city.trim(); 
                return city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();
            });
        
        const uniqueCities = [...new Set(cities)];
        
        return NextResponse.json({ success: true, result: uniqueCities });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        );
    }
}