import { NextResponse } from "next/server";
import { UserDetails } from "../../../../../lib/models/UserDetails";
import { mongooseConnect } from "../../../../../lib/mongooseConnect";

export async function GET(req, context)
{
    const {params} = context;
    const uem = params.uid;
  
    await mongooseConnect();
    const filter = {
        "useremail" : uem,
    }
    

    const usermade = await UserDetails.findOne(filter);

    return NextResponse.json(usermade);

}