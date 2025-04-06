import { connectionStr } from "@/app/lib/db";
import { deliveryPartnersSchema } from "@/app/lib/deliverypartnersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server"

export async function GET(req, res){
    let city=res.params.city;
    let success=false;
    await mongoose.connect(connectionStr,{useNewUrlParser:true});
    const filter={city:{$regex:new RegExp(city,'i')}}
    const result=await deliveryPartnersSchema.find(filter)
    if(result){
        success=true
    }
    return NextResponse.json({result,success})
}