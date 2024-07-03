import { NextResponse } from "next/server";
import { mongooseConnect } from "../../../../../lib/mongooseConnect";
import { Product } from "../../../../../lib/models/Product";
import { Review } from "../../../../../lib/models/Review";

export async function GET(req, context)
{
    
    const {params} = context;
    const spid = await params.pid.toString();
    await mongooseConnect();
    const filter1 = { "product" : spid };
    const allrev = await Review.find(filter1);
    
    return NextResponse.json(allrev);
}