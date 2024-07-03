import { NextResponse } from "next/server";
import { mongooseConnect } from "../../../../../lib/mongooseConnect";
import { Product } from "../../../../../lib/models/Product";
import { Category } from "../../../../../lib/models/Category";

export async function GET(req, context)
{
    
    const {params} = context;
    const scid = await params.cid.toString();
    await mongooseConnect();
    const filter1 = { "_id" : scid };
    const cat = await Category.findOne(filter1);
    
    const fcatname = cat.catname;
    
    const filter2 = {"parentcatname" : fcatname};
    const prod = await Product.find(filter2);
    
    return NextResponse.json(prod);
}