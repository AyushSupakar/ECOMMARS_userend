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
  const [username, setusername] = useState('');
  const [useremail, setuseremail] = useState('');
  const [country, setcountry] = useState('ind');
  const [userphno, setuserphno] = useState('');
  const [useraddress, setuseraddress] = useState('');
  const [useraddresspin, setuseraddresspin] = useState('');


  
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

  async function createProduct(ev){
    ev.preventDefault();
    const remail =session?.user?.email;
    const userimg =session?.user?.image;
    const data = {remail, userimg, username, useremail, country, userphno, useraddress, useraddresspin, totprice};
    const neworder = await axios.post('/api/order/'+remail, data);
     Swal.fire({
      title: "Order Placed!", 
      text :"Your Order has been placed Successfully!",
      icon: "success"
     })
  }
 

 

 
    return (
    <NewLayout>
       <div className="flex justify-center items-center p-4">

        <div className="infinity">

        <h1 className="px-1 mb-1 ctext-blue-900 font-bold text-2xl">Checkout</h1>
        <form onSubmit={createProduct} className=" flex flex-col mt-4 text-lg">
            <label htmlFor="np-pns">Name: </label>
            <input  type="text" value={username} onChange={(ev)=>setusername(ev.target.value) } id="np-pns"></input>


            <label htmlFor="ds">E-mail: </label>
            <input id="ds"  type="email" value={useremail} onChange={(ev)=>setuseremail(ev.target.value) } ></input>

            <label htmlFor="np-jh">Phone No.: </label>
            <select name="" id="" className='w-content p-1' onChange={(ev)=>setcountry(ev.target.value)} value={country}> 
            <option id='in' value={"ind"} onChange={(ev)=>{setparentCat(ev.target?.value)}} selected>India</option>
            <option id='us' value={"usa"} onChange={(ev)=>{setparentCat(ev.target?.value)}} selected>USA</option>
            </select>
            
            <div className="smile">
                <div className="again p-1 border-2 border-gray-200 rounded-lg mx-4 "><span>{(country=="ind")?('+91'):('+1')}</span></div>

                <div className=""><input className='m-0 sittubhai'  id="np-jh" type="number" placeholder='phone no.' value={userphno} onChange={(ev)=>setuserphno(ev.target.value) }>
            </input></div>
                
            </div>

            <label htmlFor="np-ik">Address: </label>
            <textarea  name="" id="np-ik"  value={useraddress} onChange={(ev)=>setuseraddress(ev.target.value) }></textarea>

            <label htmlFor="np-j">Pin Code: </label>
            <input id="np-j"  type="number" value={useraddresspin} onChange={(ev)=>setuseraddresspin(ev.target.value) }></input>
            <label className='m-0 px-4' htmlFor="np-p">Total Price(INR): </label>
        <div className="strong">
        <span className='font-bold text-center text-justify text-xl px-4'>Rs. {totprice}/-</span></div>
            

            <div className="see">
                  <div className="flex  items-center justify-between">
                            <Link href={"/cart"} className='btn-mprimary py-1 px-2'>
                                  <div className="flex items-center justify-between px-2 py-1 mx-1 font-bold text-center">
                                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M9.00002 15.3802H13.92C15.62 15.3802 17 14.0002 17 12.3002C17 10.6002 15.62 9.22021 13.92 9.22021H7.15002" stroke="#ffffff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M8.57 10.7701L7 9.19012L8.57 7.62012" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                                    <div className='text-center px-2 items-center'>Go Back</div>
                                    
                                  </div>
                                </Link>
                                      </div>
              <div className="flex ">
                            <button type='submit' className='btn-nprimary py-1 px-2'><svg viewBox="0 0 24 24" className=' px-2' fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="3" y="6" width="18" height="13" rx="2" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></rect> <path d="M3 10H20.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> <path d="M7 15H9" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>Go to Payment</button></div>
                
            </div>


            

           



              
        </form>

        </div>

       </div>


    </NewLayout>
  )
}
