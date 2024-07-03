import mongoose from 'mongoose'

export async function mongooseConnect() {
 if(mongoose.connection.readyState===1)
    {
        
        return mongoose.connection.asPromise();
    }
    else{
        const uri = process.env.AMONGODB_URI;
        
        const connected = await mongoose.connect(uri);
        
        return connected;

    }
}