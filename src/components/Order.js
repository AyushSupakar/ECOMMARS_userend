import React from 'react'

export default function Order(props) {
    const {order} = props;
  return (
    <div className="flex flex-col items-center">
        <div className="flex justify-center items-center"><div className=" cbg-blue-900 text-white shdw mx-2 mt-4 justify-center items-center text-center mb-2 rounded-xl p-4 h-5/6 justify-around px-4">
        
        <span className="chhotadon">Order No. {order._id}</span>

      </div></div>    {
                
                order?.line_items?.map(each=>{

                    return(
                    
                   <div key={each.price_data.product_data.pid} className='yoshi'>
            <div className="simi">
              <div className="paanwala">
                <img className='h-48 w-32' src={each.price_data.product_data.image} alt="" />
              </div>
              <div className="popatlaal">
                <div className="flex">
                  <span className='font-bold text-xl'>{each.price_data.product_data.name}</span>
                </div>
               
                <div className="poonawala">

                <div className="flex items-center justify-between px-2 font-bold"><span className='font-bold text-xl'>
                    <span className='font-bold text-lg'>Price: Rs.</span>{each.price_data.product_data.price}/-
                  </span></div>


                  <div className="flex justify-between items-center">

                  <div className="flex items-center font-bold mx-2"><span className='font-bold text-xl'>
                  <span className='font-bold text-lg'>Qty: </span></span></div>

                    

                                <div className="flex items-center font-bold mx-2"><span className='font-bold text-xl'>
                    <span className='font-bold text-lg'></span>{each.qty}</span></div>



                    

                  </div>

                  <div className="flex items-center justify-between px-2 font-bold"><span className='font-bold text-xl'>
                    <span className='font-bold text-lg'>Ordered On: </span>{((order?.time).toString()).slice(0,10)}
                  </span></div>



                    


                  


                  



                  {/* <Link href={"/products/" + each.price_data.product_data.pid} className='btn-zprimary'>
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
                  </Link> */}
                  

                  



                </div>
              </div>
            </div>
          </div>
        
                    )
                })
            }

<div className='yoshi'>
            <div className="flex justify-between  items-center shdw m-2 p-4">


            <div className="flex ">
                <span className='font-bold text-lg'>Total Price:</span>
              </div>

            <div className="flex border-2 border-black rounded-xl p-2 ">
              <span className='font-bold text-xl'>Rs. {order?.totprice} /-</span>
            </div>


            </div>
        </div>

        <div className='yoshi'>
            <div className="flex flex-col justify-between shdw m-2 p-4 ">

              

            <span className='font-bold text-xl py-2'>Address Details:</span>
            
            <div className="flex items-center gap-2"><label className='m-0 p-0 text-lg' htmlFor="ds">Address: </label>
            <span className='text-lg' >{order?.userAddress}</span></div>

            <div className="flex items-center gap-2"><label className='m-0 p-0 text-lg' htmlFor="ds">Pin Code: </label>
            <span className='text-lg'>{order?.userAddressPin}</span></div>

            <div className="flex items-center gap-2"><label className='m-0 p-0 text-lg' htmlFor="ds">Country: </label>
            <span className='text-lg'>{((order?.userCountry)=="ind")?("India"):("USA")}</span></div>

            

            


            



            </div>
        </div>


        </div>

  )
}
