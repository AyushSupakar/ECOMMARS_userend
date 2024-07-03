
import { NextResponse } from "next/server";
import { UserDetails } from "../../../../lib/models/UserDetails";
import { mongooseConnect } from "../../../../lib/mongooseConnect";


export async function POST(req, res)
{
    await mongooseConnect();
    const body = await req.json();
    const {useremail, username, userimg} = body;
    

    const data = {
        "useremail" : useremail,
        "username" : username,
        "userimg" : userimg,
    }
    
    
    const usermade = await UserDetails.create(data);

    return NextResponse.json(usermade);

}
