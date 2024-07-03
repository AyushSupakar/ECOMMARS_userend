"use client"
import NewLayout from '@/components/NewLayout'
import axios from 'axios'
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';

export default function ParentCategoryPage(props) {
    const {pcname} = props;
    
   
    const [arr, setarr]= useState([]);
    useEffect(()=>{axios.get('/api/categories').then(res=>{
       setarr(...arr, res.data.filter(eachcat=>eachcat.parentcatname===pcname))})},[]);
    
       const {data:session} = useSession();
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
       
  return (
    <>
    <NewLayout>
        <div className="flex flex-wrap items-center justify-center">
            {arr.map(each=>{return(<Link key={each._id} className='m-4 p-4' href={"/category/"+each._id} ><div className=" flex shdw m-2 p-4">
            <div className="flex flex-col  justify-center items-center text-center 
            font-sans text-lg"><span>{each.catname}</span>
            <div className="flex "><img className='catimq' src={each.imgurl} alt="" /></div> </div>
            <div className="flex items-center justify-evenly">
            </div>

        </div></Link>
            )})}

        </div>
    </NewLayout>

    </>
  )
}
