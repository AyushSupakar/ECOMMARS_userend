import { NextResponse } from "next/server";
import { mongooseConnect } from "../../../../../lib/mongooseConnect";
import { Cart } from "../../../../../lib/models/Cart";
import { Product } from "../../../../../lib/models/Product";
import { Order } from "../../../../../lib/models/Order";


export async function GET(req, context)
{
    
    const {params} = context;
    const rem = await params.rem.toString();
    await mongooseConnect();
    const filter1 = { "registeredemail" : rem };
    const orders = await Order.find(filter1);
   
    return NextResponse.json(orders);
}


export async function POST(req, context)
{
    
    const {params} = context;
    const rem = await params.rem.toString();
    await mongooseConnect();
    const filter1 = { "useremail" : rem };

    const body = await req.json();
    const {remail, userimg, username, useremail, country, userphno, useraddress, useraddresspin, totprice} = body;
    const cart = await Cart.findOne(filter1);
    let {cartstate} = cart;

    
    

    let unique_cart=[];
    cartstate.map((each)=>{
        if(!unique_cart.includes(each)){
            unique_cart.push(each);
        }
    });


    const line_items=[];
   
    

    
    const body1 = {
    "registeredemail" : rem, 
    "username" : username,
    "useremail" : useremail,
    "userimg" : userimg,
    "userPhoneNo" : userphno,
    "userAddress" :useraddress,
    "userCountry" :country,
    "userAddressPin": useraddresspin,
    "totprice": totprice,
    "cartstate": cartstate,
    "line_items": line_items,
    }
     const neworder = await Order.create(body1); 

     const filter2 = {
        "_id" : neworder._id
     }

     Promise.all(unique_cart.map(async (each)=>{
        
            const qty = (cartstate.filter((i)=>{return(each===i)})).length;
            
             const pinfo = await Product.findOne({"_id":each})
            if((pinfo)&&(qty>0)){

                await Order.findOneAndUpdate(filter2,{
                    $push:{
                        "line_items" : {
                            qty,
                            price_data: {
                                currency: "INR",
                                product_data: {name : pinfo.prdname, price: pinfo.price, image: pinfo.imgurl, pid : pinfo._id},
                                unit_amount: (pinfo.price)*qty,
                            },
                        },
                    }
                },{new:true}); 
            
                
            }
    })
)

const filter3 = { "useremail" : rem };

    await Cart.findOneAndDelete(filter3);


     
    return NextResponse.json(neworder);

}