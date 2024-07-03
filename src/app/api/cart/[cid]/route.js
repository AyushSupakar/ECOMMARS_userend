import { NextResponse } from "next/server";
import { mongooseConnect } from "../../../../../lib/mongooseConnect";
import { Product } from "../../../../../lib/models/Product";

import { Cart } from "../../../../../lib/models/Cart";

export async function GET(req, context)
{
    
    const {params} = context;
    const uem = await params.cid.toString();
    await mongooseConnect();
    
    const filter1 = { "useremail" : uem };
    const mycart = await Cart.findOne(filter1);
    
    return NextResponse.json(mycart);
}

export async function PUT(req, context)
{
    const {params} = context;
    const useremail = await params.cid.toString();
    const body = await req.json();
    await mongooseConnect();
    const {pid} = body;
    
    const filter1 = { "useremail" : useremail };

    if((await Cart.findOne(filter1))==null){
        await Cart.create({ "useremail" : useremail, "cartstate" : []  });
    }

    // if(((await Cart.findOne(filter1)).cartstate.includes(pid))){
    //     return NextResponse.json({"msg" : "already added" });; 
    // }
    
    const newcart = await Cart.findOneAndUpdate(filter1,{
        $push:{
            "cartstate" : pid,
        }
    },{new:true}); 
    return NextResponse.json(newcart);

}

