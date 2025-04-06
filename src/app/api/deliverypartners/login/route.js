import { connectionStr } from "@/app/lib/db";
import { deliveryPartnersSchema } from "@/app/lib/deliverypartnersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    const payload = await req.json();
    let success = false;
    await mongoose.connect(connectionStr, { useNewUrlParser: true });

    const result = await deliveryPartnersSchema.findOne({mobile: payload.mobile, password:payload.password});
    // const result =await user.save();
    if (result) {
        success = true
    }



    return NextResponse.json({ result, success })

}