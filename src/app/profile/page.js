"use client"
import NewLayout from '@/components/NewLayout'
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';

export default function Page() {
   const {data : session} = useSession();
    const [username, setusername] = useState(session?.user?.name);
    const [useremail, setuseremail] = useState(session?.user?.email);
    const [userimg, setuserimg] = useState(session?.user?.image);

   
    const router = useRouter();
    if(!session){
        router.push('/');
        Swal.fire({
            title: 'Not Logged In!',
            text: 'Please Log in to continue...',
            icon: 'error',
            confirmButtonText: 'okay'
        })
    }


    async function postfun(){
               await axios.post('/api/userdetails',{username , useremail, userimg}).then(res=>{
                    })
    } 
    useEffect(()=>{
        
        
            axios.get('/api/userdetails/'+(session?.user?.email)).then(res=>{
            if((res.data)==null){
                postfun();
            }

        })
        
    },[]);
    



  return (
    <NewLayout>
        <div className='flex flex-col justify-center items-center '>

        <div className="border-8 cborder-blue-900 rounded-full p-2 my-6 shadow-xl "><img src={session?.user?.image} alt="" className="coverdrive"/></div>

        <div className='flex flex-col m-2 p-2 shdw rounded-2xl'>
            {/* name */}
        {(true)?(<div className=' flex items-center  my-2 p-2 px-4 '>
            <div className="flex items-center"><label htmlFor="username" className='m-0 lgsm text-grey-400 font-bold'>Name: </label></div>
            <div className="flex items-center"><span name="username" className=' font-bold text-black lgsm'>{session?.user?.name}</span></div>
            
        </div>):(<></>)}

            {/* email */}
            {(true)?(<div className=' flex items-center  my-2 p-2 px-4 rounded-xl'>
            <div className="flex items-center"><label htmlFor="username" className='m-0 lgsm text-grey-400 font-bold'>Email: </label></div>
            <div className="flex items-center"><span name="useremail" className=' font-bold text-black lgsm'>{session?.user?.email}</span></div>
            
        </div>):(<></>)}

        <div className="flex justify-center items-center mt-2 mb-8 ">
        <Link href={"/orders"} className='btn-yprimary pb-4'>
                      <div className="flex items-center justify-between px-1 font-bold">
                        <svg viewBox="0 0 64 64" className='size-10' xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <defs>  </defs> <g id="free-shipping"> <circle className="cls-1" cx="53" cy="17" r="2"></circle> <circle cx="45.5" cy="23.5" r="1.0691"></circle> <circle cx="16.5" cy="14.5" r="1.0691"></circle> <polyline className="cls-1" points="53.934 54 61 54 61 43.485 54 40 49.476 31 39.173 31"></polyline> <line className="cls-1" x1="20.6727" x2="44.1886" y1="54" y2="54"></line> <polyline className="cls-1" points="10.748 24 3 24 3 54 10.894 54"></polyline> <polyline className="cls-1" points="39 49 39 24 32.161 24"></polyline> <line className="cls-1" x1="43" x2="45" y1="44" y2="44"></line> <circle className="cls-1" cx="49.0802" cy="54.75" r="4.75"></circle> <circle className="cls-1" cx="15.7406" cy="54.75" r="4.75"></circle> <polyline className="cls-1" points="26 37 23 37 23 43 26 43"></polyline> <line className="cls-1" x1="26" x2="23" y1="40" y2="40"></line> <polyline className="cls-1" points="32 37 29 37 29 43 32 43"></polyline> <line className="cls-1" x1="32" x2="29" y1="40" y2="40"></line> <polyline className="cls-1" points="13 37 10 37 10 43"></polyline> <line className="cls-1" x1="13" x2="10" y1="40" y2="40"></line> <path className="cls-1" d="M16,43V37h2.6439A1.3562,1.3562,0,0,1,20,38.3561v.2878A1.3562,1.3562,0,0,1,18.6439,40H17l3,3"></path> <path className="cls-1" d="M31.5561,22.7505,27.623,17.8342a2.0742,2.0742,0,0,0-2.598-.5845,2.001,2.001,0,0,0-.5919,3l1.4,1.75H12.9946a2,2,0,0,0-2,2h0a2,2,0,0,0,2,2H25.8335l-1.317,1.6462a2.1129,2.1129,0,0,0,.2609,2.9407,2,2,0,0,0,2.7787-.3374l4-5A2,2,0,0,0,31.5561,22.7505Z"></path> <line className="cls-1" x1="33" x2="30" y1="7" y2="10"></line> <line className="cls-1" x1="30" x2="33" y1="7" y2="10"></line> <line className="cls-2" x1="39" x2="54" y1="40" y2="40"></line> <line className="cls-2" x1="3" x2="61" y1="50" y2="50"></line> </g> </g></svg>
                        <span className="font-bold lgsm px-1"> Your Orders</span>
                      </div>
                    </Link>
      </div>



        </div>

        </div>
    </NewLayout>
  )
}
