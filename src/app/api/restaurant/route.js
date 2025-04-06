import { connectionStr } from "@/app/lib/db";
import { RestaurantSchema } from "@/app/lib/restaurantsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// export async function GET() {
//     await mongoose.connect(connectionStr, { useNewUrlParser: true })
//     const data = await RestaurantSchema.find()

//     console.log(data);
//     return NextResponse.json({ result: true })

// }
export async function GET(req) {
    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
        try {
            const data = await RestaurantSchema.findById(id);
            if (data) {
                return NextResponse.json({ success: true, result: data });
            } else {
                return NextResponse.json({ success: false, message: "Restaurant not found" });
            }
        } catch (error) {
            return NextResponse.json({ success: false, message: "Invalid ID or error fetching restaurant" });
        }
    }


    const data = await RestaurantSchema.find();
    return NextResponse.json({ success: true, result: data });
}


export async function POST(req) {
    let payload = await req.json();
    await mongoose.connect(connectionStr, { useNewUrlParser: true });
    let result;
    let success=false;
    if(payload.login){
        result = await RestaurantSchema.findOne({email:payload.email, password:payload.password})
        if(result){
            success=true;
        }
    }
    else{
        const restaurant = new RestaurantSchema(payload)
        result = await restaurant.save();
        if(result){
            success=true;
        }
    }
   
   
    return NextResponse.json({result,success:true})

}