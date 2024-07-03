"use client"
import React, { useEffect } from 'react'
import { useSession } from "next-auth/react"
import Swal from 'sweetalert2'

import MyNavBar from './MyNavBar';
import { useRouter } from 'next/navigation';


export default function NewLayout({children}) {
  const { data: session } = useSession(); 
  const router = useRouter();
  useEffect(()=>{
    
   
    if(!session){
      router.push('/');
    }
  },[])
 
    

    if(session){ 
      
      
      return(
        <div className="flex flex-col h-screen justify-between">
          <div className="text-white cbg-blue-900 font-bold"><MyNavBar logStatus="loggedIn"/></div>
          <div className="flex-grow ">{children}</div>
          <footer className="flex justify-evenly cbg-blue-900 p-2 text-white "><span>contact us at : ecommars@gmail.com</span></footer>
        </div>
      )
    }
    else{
      
     
      return(
        <div className="flex flex-col justify-between h-screen">
        <div className="text-white cbg-blue-900 font-bold w-full"><MyNavBar logStatus="loggedOut"/></div>
        <div className="flex-grow ">{children}</div>
        <footer className="flex justify-evenly cbg-blue-900 p-2 text-white "><span>contact us at : ecommars@gmail.com</span></footer>
        </div>
      )
    }
    
}
