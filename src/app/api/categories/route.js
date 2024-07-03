import axios from "axios";
import { NextResponse } from "next/server";
import { Category } from "../../../../lib/models/Category";
import { mongooseConnect } from "../../../../lib/mongooseConnect";
 
await mongooseConnect();

export async function GET(req){
    const allcats = await Category.find();
    return NextResponse.json(allcats);
}

 