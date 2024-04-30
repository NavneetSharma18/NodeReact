import React,{useState,useEffect} from 'react'
import { useNavigate,useSearchParams }  from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
axios.defaults.withCredentials = true


const Thankyou = ()=>{

  const [searchParams] = useSearchParams();
  const [checkoutProductData,  setCheckoutProductData] = useState(['']);
  const [checkoutProducts,  setCheckoutProducts] = useState(['']);


  const auth  = useSelector((state) => state.loginRes.userId);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL
  //console.log(API_BASE_URL)
  
  useEffect(()=>{

    axios(API_BASE_URL+"/payment/get-order", {
      method: "post",
      data:{sessionId:searchParams.get('session_id')},
      //withCredentials: true
    }).then(function (result) {
        result = result.data
       if(result.status == true){
          setCheckoutProductData(result.orderData);
          setCheckoutProducts(result.orderData.products)
         
        }else{

            toast.warning(result.msg, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
    });

  },[])

  

  return (

           <div className="register_div">
            
                      <div className="justify-center items-center   text-gray-900">
                        <div className="rounded-md relative  p-3 ">
                          <div className='text-center text-xxl font-bold text-white'>❤ Your order has been received Thanks!</div>

                          <div className="py-2 my-4">
                            <div className="text-center text-xl font-bold text-white">ORDER</div>
                            <div className="text-center text-xs font-bold text-white">The order details</div>
                          </div>
                          <div className="text-center text-xs font-bold mb-1 text-white">~~~~~~~~~~~~~~~~~~~~~~~~~~~~</div>
                          <div className="text-xs pl-2">
                            <div className="text-xs mb-1 text-white">Customer：{checkoutProductData.shipping_address?checkoutProductData.shipping_address.name:''}</div>
                            <div className="text-xs mb-1 text-white">TelePhone：{checkoutProductData.shipping_address?checkoutProductData.shipping_address.phone:''}</div>
                            <div className="text-white">OrderNumber：{checkoutProductData._id}</div>
                          </div>
                          <div className="border-double border-t-4 border-b-4 border-l-0 border-r-0 border-white-900 my-3">
                           
                            <div className="flex text-sm pt-1 px-1">
                              <span className="w-2/6 text-white">Name</span>
                              <span className="w-2/6 text-right text-white">Price</span>
                              <span className="w-2/6 text-right text-white">Qty</span>
                            </div>

                            <div className="border-dashed border-t border-b border-l-0 border-r-0 border-whit-900 mt-1 my-2 py-2 px-1">
                              {
					  	                   checkoutProducts.length>0 ? checkoutProducts.map((item,index)=>
                                  <div className="flex justify-between text-sm">
                                    <span className="w-2/6 truncate text-white">{item.description}</span>
                                    <span className="w-2/6 text-right text-white">₹{item.amount_total/100}</span>
                                    <span className="w-2/6 text-right text-white">{item.quantity}</span>
                                  </div>
                              )
                              :'No result found'
                            }
                            </div>

                          </div>
                          <div className="text-xs gtotal">
                          <div className="text-right">
                             <div className="font-bold text-sm text-white">Sub Total    : ₹{checkoutProductData.sub_total}</div>
                              <div className="font-bold text-sm text-white">Total       : ₹{checkoutProductData.total}</div>
                            </div>
                          </div>
                        </div>
                      </div>
              </div>
        )

}

export default Thankyou
