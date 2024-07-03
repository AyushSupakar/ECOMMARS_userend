"use client"
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function Home() {
    const [cats, setcats] = useState([]);
    const [prods, setprods] = useState([]);
    const [currprod, setcurrprod] = useState(null);
    const{data : session} = useSession();
    useEffect(() => {
      // Fetch categories
      axios.get('/api/categories').then((res) => {
        setcats(res.data);
      }).catch(err => {
          console.error("Error fetching categories:", err);
      });

      // Fetch products and set interval
      axios.get('/api/products').then((res) => {
        setprods(res.data);

          const interval = setInterval(() => {
              
              setcurrprod(null)
              const i = Math.floor(Math.random() * res.data.length);
              

              setcurrprod(res.data[i]);
              
          }, 40000);

          // Cleanup interval on component unmount
          return () => clearInterval(interval);

      }).catch(err => {
          console.error("Error fetching products:", err);
      });
  }, []);
  return (
    <div>
      
      {(currprod)?(<div className="mqf m-8 shdw rounded-xl p-4 h-4/6 justify-around">
        <div className="jhunjhunwala p-4" >
          <div className="iw"><img className='' src={currprod?.imgurl} alt="" /></div><div className="flex flex-col justify-center dw p8mq ">
              <div className="flex justify-center  items-center">
                  <div className="flex"><h1 className="lg:text-2xl md:text-xl sm:text-lg namemq font-bold text-center justify-around">{currprod?.prdname}</h1></div>
              </div>
              <div className="flex justify-center items-center text-around text-justify lg:text-lg md:text-md sm:text-base descmq"><span>{((currprod?.desc?.length)<=420)?(currprod?.desc):(((currprod?.desc)?.slice(0,419))+"...")}</span></div>

              <div className="mqpo ">
                <div className="flex"><span className='font-bold ' ><span className='font-bold text-gray-700' >Price:</span> &#8377;{currprod.price}/-</span></div>
                {(session)?(<div className="flex"><Link href={"/products/"+currprod._id} className='btn-primary' > <div className="flex items-center justify-between px-2 font-bold "><svg  viewBox="-1.92 -1.92 27.84 27.84" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="2"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 8V5C6 4.44772 6.44772 4 7 4H17C17.5523 4 18 4.44772 18 5V19C18 19.5523 17.5523 20 17 20H7C6.44772 20 6 19.5523 6 19V16M6 12H13M13 12L10.5 9.77778M13 12L10.5 14.2222" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg> Open</div> </Link></div>):(<div className="flex"><div  className='btn-xprimary' > <div className="flex items-center justify-between px-2 font-bold "><svg  viewBox="-1.92 -1.92 27.84 27.84" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="2"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 8V5C6 4.44772 6.44772 4 7 4H17C17.5523 4 18 4.44772 18 5V19C18 19.5523 17.5523 20 17 20H7C6.44772 20 6 19.5523 6 19V16M6 12H13M13 12L10.5 9.77778M13 12L10.5 14.2222" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg> Login to explore</div> </div></div>)}
                      
                      
                    </div>
         
         </div></div>
          

         
          

      </div>):(<></>)}

      {(cats)?(<div className="flex justify-center items-center"><div className=" w-2/4 cbg-blue-900 text-white shdw mx-8 mt-4 justify-center items-center text-center mb-2 rounded-xl p-4 h-5/6 justify-around px-4">
        
        <span className=" catmq">CATEGORIES</span>

      </div></div>):(<>loading...</>)}




      <div className="allcatmq">

        {cats.map((eachcat)=>{return(<Link key={eachcat._id} className=' m-2 p-2' href={"/category/"+eachcat._id} ><div className=" flex shdw m-2 p-4">
            <div className="catnamemq"><span>{eachcat.catname}</span>
            <div className="flex "><img className='catimq' src={eachcat.imgurl} alt="" /></div> </div>
            <div className="flex items-center justify-evenly">
            </div>

        </div></Link>)})}

      

      </div>

    </div>
  )
}
