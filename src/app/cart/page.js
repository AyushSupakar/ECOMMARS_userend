"use client";
import NewLayout from '@/components/NewLayout';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function Page() {
  const { data: session } = useSession();
  const [parr, setParr] = useState([]);
  const [parrid, setParrid] = useState([]);
  const [totprice, setTotprice] = useState(0);

  
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


  async function addtocart(pid){
    const data = {pid}
    await axios.put('/api/cart/'+(session?.user?.email),data);
    fetchcartdetails();
    Swal.fire({
      title: "Quantity increased!",
      text: "Quantity has been increased!",
      icon: "success"
    });

}

async function removefromcart(pid){
  const data = {pid}
  await axios.put('/api/cart/delete/'+(session?.user?.email),data);
  fetchcartdetails();
  Swal.fire({
    title: "Quantity decreased!",
    text: "Quantity has been decreased!",
    icon: "success"
  });

}

function fetchcartdetails(){
  if (session?.user?.email) {
    axios.get('/api/cart/' + session?.user?.email).then(res => {
      const cartItems = res.data?.cartstate || [];
      Promise.all(
        cartItems.map(item => axios.get('/api/products/' + item).then(res => res.data))
      ).then(products => {
        setParr(products);
        const totalPrice = products.reduce((sum, product) => sum +  Number(product.price), 0);
        setTotprice(totalPrice);
      });
    });
  }
}

  useEffect(() => {
    fetchcartdetails();
  }, [session]);

  if (parr.length === 0) {
    return (
      <NewLayout>
        <div className='flex h-3/4 justify-center items-center'>
          <div className="flex justify-center items-center">
          <h1 className='font-bold text-2xl prettytext'>Nothing in the cart..</h1>
          </div>
        </div>
      </NewLayout>
    );
  }

  else{
    return (
    <NewLayout>
      <div className="flex  flex-col justify-center items-center">
        {parr.map((each, indx) => {
          let qty=0;
          let smallest=indx;
          parr.forEach((x, idx)=>{
            if((x._id)==(each._id)){
              
              smallest = Math.min(smallest,idx);
             
              qty++;
            }
          })



          if((indx)>(smallest)){
            return(<div key="0"></div>)
          }
          
          else {return(
          <div key={each._id} className='m-4 w-11/12 p-4'>
            <div className="fish">
              <div className="truth">
                <img className='w-44 h-68' src={each.imgurl} alt="" />
              </div>
              <div className="heart">
                <div className="flex">
                  <span className='stay'>{each.prdname}</span>
                </div>
               
                <div className="cigarette">

                <div className="flex items-center justify-between px-2 font-bold"><span className='font-bold text-xl'>
                    <span className='badder'>Price: Rs.</span>{each.price}/-
                  </span></div>


                  <div className="blinding">

                  <div className="flex items-center font-bold mx-2"><span className='font-bold text-xl'>
                  <span className='badder'>Qty: </span></span></div>

                    <div className="flex">
                    <div className="flex mx-2"><button className='btn-nprimary mx-2' onClick={()=>{addtocart(each._id)}}> 
                                    <div className="flex items-center font-bold px-1.5 "><span className='font-bold text-xl'>+</span></div>
                                </button></div>

                                <div className="flex items-center font-bold mx-2"><span className='font-bold text-xl'>
                    <span className='badder'></span>{qty}</span></div>



                    <div className="flex mx-2 "><button className='btn-mprimary ' onClick={()=>{removefromcart(each._id)}}> 
                                    <div className="flex items-center font-bold px-2"><span className='font-bold text-xl'>-</span></div>
                                </button></div>
                    </div>

                  </div>



                    


                  


                  



                  <Link href={"/products/" + each._id} className='btn-zprimary'>
                    <div className="flex items-center justify-between px-2 font-bold">
                      <svg viewBox="-1.92 -1.92 27.84 27.84" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="2">
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                          <path d="M6 8V5C6 4.44772 6.44772 4 7 4H17C17.5523 4 18 4.44772 18 5V19C18 19.5523 17.5523 20 17 20H7C6.44772 20 6 19.5523 6 19V16M6 12H13M13 12L10.5 9.77778M13 12L10.5 14.2222" stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round"></path>
                        </g>
                      </svg>
                      Open
                    </div>
                  </Link>
                  

                  



                </div>
              </div>
            </div>
          </div>
        )}})}

        <div className='m-4 w-11/12 p-4'>
            <div className="flex justify-between  items-center shdw m-2 p-4">

            <div className="flex ">
                <span className='font-bold text-lg'>Total Price:</span>
              </div>

            <div className="flex border-2 border-black rounded-xl p-2 ">
              <span className='font-bold text-xl'>Rs. {totprice} /-</span>
            </div>


            </div>
        </div>

      </div>

      <div className="flex justify-center items-center mt-2 mb-8 ">
        <Link href={"/checkout"} className='btn-yprimary pb-4'>
                      <div className="flex items-center justify-between px-2 font-bold">
                        <svg fill="#ffffff" version="1.1" className=' size-16 py-1 px-2' id="Capa_1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 236.764 236.764" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M110.035,151.039c0.399,3.858,3.655,6.73,7.451,6.73c0.258,0,0.518-0.013,0.78-0.04c4.12-0.426,7.115-4.111,6.689-8.231 l-3.458-33.468c-0.426-4.121-4.11-7.114-8.231-6.689c-4.12,0.426-7.115,4.111-6.689,8.231L110.035,151.039z"></path> <path d="M156.971,157.729c0.262,0.027,0.522,0.04,0.78,0.04c3.795,0,7.052-2.872,7.451-6.73l3.458-33.468 c0.426-4.121-2.569-7.806-6.689-8.231c-4.121-0.419-7.806,2.569-8.231,6.689l-3.458,33.468 C149.855,153.618,152.85,157.303,156.971,157.729z"></path> <path d="M98.898,190.329c-12.801,0-23.215,10.414-23.215,23.215c0,12.804,10.414,23.221,23.215,23.221 c12.801,0,23.216-10.417,23.216-23.221C122.114,200.743,111.699,190.329,98.898,190.329z M98.898,221.764 c-4.53,0-8.215-3.688-8.215-8.221c0-4.53,3.685-8.215,8.215-8.215c4.53,0,8.216,3.685,8.216,8.215 C107.114,218.076,103.428,221.764,98.898,221.764z"></path> <path d="M176.339,190.329c-12.801,0-23.216,10.414-23.216,23.215c0,12.804,10.415,23.221,23.216,23.221 c12.802,0,23.218-10.417,23.218-23.221C199.557,200.743,189.141,190.329,176.339,190.329z M176.339,221.764 c-4.53,0-8.216-3.688-8.216-8.221c0-4.53,3.686-8.215,8.216-8.215c4.531,0,8.218,3.685,8.218,8.215 C184.557,218.076,180.87,221.764,176.339,221.764z"></path> <path d="M221.201,84.322c-1.42-1.837-3.611-2.913-5.933-2.913H65.773l-6.277-24.141c-0.86-3.305-3.844-5.612-7.259-5.612h-30.74 c-4.142,0-7.5,3.358-7.5,7.5s3.358,7.5,7.5,7.5h24.941l6.221,23.922c0.034,0.15,0.073,0.299,0.116,0.446l23.15,89.022 c0.86,3.305,3.844,5.612,7.259,5.612h108.874c3.415,0,6.399-2.307,7.259-5.612l23.211-89.25 C223.111,88.55,222.621,86.158,221.201,84.322z M186.258,170.659H88.982l-19.309-74.25h135.894L186.258,170.659z"></path> <path d="M106.603,39.269l43.925,0.002L139.06,50.74c-2.929,2.929-2.929,7.678,0,10.606c1.464,1.464,3.384,2.197,5.303,2.197 c1.919,0,3.839-0.732,5.303-2.197l24.263-24.263c2.929-2.929,2.929-7.678,0-10.606l-24.28-24.28c-2.929-2.929-7.678-2.929-10.607,0 c-2.929,2.929-2.929,7.678,0,10.607l11.468,11.468l-43.907-0.002h0c-4.142,0-7.5,3.358-7.5,7.5 C99.104,35.911,102.461,39.269,106.603,39.269z"></path> </g> </g></svg>
                        <span className="font-bold text-xl">Checkout</span>
                      </div>
                    </Link>
      </div>

    </NewLayout>
  )};
}
