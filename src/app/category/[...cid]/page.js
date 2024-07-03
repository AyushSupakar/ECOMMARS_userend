"use client"
import NewLayout from '@/components/NewLayout'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

// prdname : {type:String , required: true},
// desc : {type:String , required: true},
// price : {type:String , required: true},
// imgurl : {type:String, required: true},
// parentcatname :{type:String, required: true},

export default function Page() {
    const [arr, setarr] = useState([]);
    const router = useRouter();
    const params = useParams();
    const {cid} = params;
    useEffect(()=>{
        axios.get('/api/categories/'+cid).then(res=>{
          setarr(...arr, res.data)
          
        })
    },[])

    const {data:session} = useSession();
    
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

    <div className="flex flex-col items-center justify-center">
            {arr.map(each=>{return(
              
              <div href={"/products/"+each._id} className='m-4 p-4' key={each._id} >
                <div className=" bhoi">
                  
                  <div className="bvubhai">
                    <img className='' src={each.imgurl} alt="" />
                  </div>
                  
                  <div className="b2bhai">
                    
                    <div className="flex justify-center text-center ">
                      <span className='font-bold text-xl'>{each.prdname}</span>
                    </div>

                    <div className="descmq ">
                      <span className='text-justify' >{each.desc}</span>
                    </div>

                    <div className="judge">
                      <span className='font-bold text-xl' ><span className='font-bold text-lg' >Price: Rs.</span>{each.price}/-</span>
                      <Link href={"/products/"+each._id} className='btn-primary' > <div className="flex items-center justify-between px-2 font-bold "><svg  viewBox="-1.92 -1.92 27.84 27.84" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="2"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 8V5C6 4.44772 6.44772 4 7 4H17C17.5523 4 18 4.44772 18 5V19C18 19.5523 17.5523 20 17 20H7C6.44772 20 6 19.5523 6 19V16M6 12H13M13 12L10.5 9.77778M13 12L10.5 14.2222" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg> Open</div> </Link>
                    </div>




                  </div>
                
                </div>
                  
                
              </div>



              
              
              
              


            )})}

        </div>

    </NewLayout>
      
    </>
  )
}
