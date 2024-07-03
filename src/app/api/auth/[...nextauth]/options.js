import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from '../../../../../lib/db';



export const options = {
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_ID,
          clientSecret: process.env.GOOGLE_SECRET
        }),
    ],
    secret: process.env.NEXT_PUBLIC_SECRET,
    adapter: MongoDBAdapter(clientPromise),
       
}

export function auth(...args) {
  return getServerSession(...args,options)
}