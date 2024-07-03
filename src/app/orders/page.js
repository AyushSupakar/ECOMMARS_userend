"use client"
import NewLayout from '@/components/NewLayout'
import Order from '@/components/Order'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function Page() {
    const {data : session}=useSession();
    const [order, setorder] = useState(null);
    const [orderarr, setorderarr] = useState([]);
    const[arr, setarr]=useState([]);

    useEffect(()=>{
        axios.get("/api/order/"+session?.user?.email).then(res=>{
            setorderarr(res.data)

        })


        
    },[])


    if((orderarr?.length)==0){
      return(
        <NewLayout>
        <div className='flex h-3/4 justify-center items-center'>
          <div className="flex justify-center items-center">
          <h1 className='font-bold text-2xl prettytext'>No Orders Yet...</h1>
          </div>
        </div>
      </NewLayout>
      )
    }





  return (
    <NewLayout>


      {orderarr?.map((each)=>{
        return(<Order key={each._id} order={each}></Order>)
        
      })}

      

        
      
    </NewLayout>
  )
}
