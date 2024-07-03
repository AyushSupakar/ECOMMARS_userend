import { NextResponse } from "next/server";
import { mongooseConnect } from "../../../../lib/mongooseConnect";
import { Product } from "../../../../lib/models/Product";


export async function GET(req, context)
{
    

    await mongooseConnect();

    const allprods = await Product.find()
    

   
    return NextResponse.json(allprods);
}
