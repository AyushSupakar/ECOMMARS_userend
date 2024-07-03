import { NextResponse } from "next/server";
import { mongooseConnect } from "../../../../../../lib/mongooseConnect";
import { Cart } from "../../../../../../lib/models/Cart";


export async function PUT(req, context)
{
    const {params} = context;
    const useremail = await params.cid.toString();
    const body = await req.json();
    await mongooseConnect();
    let {pid} = body;
    
    const filter1 = { "useremail" : useremail };
    const cart = await Cart.findOne(filter1);

    if((cart)==null){
        return NextResponse.json({"msg":"removed already"});
    }
    

    cart.cartstate.filter((v,i,a)=>{
            if(v==pid){
                cart.cartstate.splice(i,1);
                pid=0;
            }
    });

    

    const newcart = await Cart.findOneAndUpdate(filter1,cart,{new:true}); 
    return NextResponse.json(newcart);

}

