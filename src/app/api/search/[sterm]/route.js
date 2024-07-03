import { NextResponse } from "next/server";
import { mongooseConnect } from "../../../../../lib/mongooseConnect";
import { Product } from "../../../../../lib/models/Product";

export async function GET(req, context)
{
    
    const {params} = context;
    let term = await params.sterm.toString();
    await mongooseConnect();
    const sterm = " "+term;
    const terms= term+" ";

    
    const allprods = await Product.find();
    let searchedprodsspace = allprods.filter(each=>{return((((each.prdname).toUpperCase().includes(sterm.toUpperCase()))||(((each.prdname).toLowerCase().includes(sterm.toLowerCase()))))||(((each.desc).toUpperCase().includes(sterm.toUpperCase()))||(((each.desc).toLowerCase().includes(sterm.toLowerCase())))))});
    let spacesearchedprods = allprods.filter(each=>{return((((each.prdname).toUpperCase().includes(terms.toUpperCase()))||(((each.prdname).toLowerCase().includes(terms.toLowerCase()))))||(((each.desc).toUpperCase().includes(terms.toUpperCase()))||(((each.desc).toLowerCase().includes(terms.toLowerCase())))))});

    const searchedprods = searchedprodsspace.concat(spacesearchedprods);
    let unique_prods=[];
    searchedprods.map((each)=>{
        if(!unique_prods.includes(each)){
            unique_prods.push(each);
        }
    });
    return NextResponse.json(unique_prods);
}
