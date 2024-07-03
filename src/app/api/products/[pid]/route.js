import { NextResponse } from "next/server";
import { mongooseConnect } from "../../../../../lib/mongooseConnect";
import { Product } from "../../../../../lib/models/Product";
import { Review } from "../../../../../lib/models/Review";

export async function GET(req, context)
{
    
    const {params} = context;
    const spid = await params.pid.toString();
    await mongooseConnect();
    const filter1 = { "_id" : spid };
    const prod = await Product.findOne(filter1);
   
    return NextResponse.json(prod);
}

export async function POST(req, res)
{
    const body = await req.json();
    const {pid} = body;
    
    const newrev = await Review.create(body); 
    return NextResponse.json(newrev);

}