import React,{useState} from 'react'
import {Link,json,useNavigate} from 'react-router-dom'
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from 'react-redux'
import {checkLogout} from '../../redux/userApi/';
import {incProductQty,decProductQty,removeProductCart} from '../../redux/productApi/';




const Navbar = ()=>{


  axios.defaults.withCredentials = true

	const auth         = useSelector((state) => state.loginRes.isUserLogin);
  const loginUserId  = useSelector((state) => state.loginRes.userId);
	const userData     = useSelector((state) => state.loginRes.authData);
  const roleId       = useSelector((state) => state.loginRes.userRoleId);

  const cartItems    = useSelector((state) => state.cartItem.cartItems);
  const total        = useSelector((state) => state.cartItem.totalPrice);
  const subTotal     = useSelector((state) => state.cartItem.subTotal);
  const shippingCost = useSelector((state) => state.cartItem.shippingCost);

	const navigate     = useNavigate();
	const dispatch     = useDispatch();
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

  const [qty,setQty] = useState(1);
  
 
	
	const logoutUser = ()=>{

		 dispatch(checkLogout());
		 navigate('/login');
	   
	}

  /*-------------------------------------------------
  | Cart Functions start
  -------------------------------------------------*/

 

  const qtyIncrease = (product) =>{
    
    const product1 = JSON.parse(JSON.stringify(product))
    product1.qty   = qty;
    setQty(qty+1);
    dispatch(incProductQty(product1));

  }

  const qtyDecrease = (product) =>{
   
    if(qty > 0){
      
      const product1 = JSON.parse(JSON.stringify(product))
      product1.qty   = qty;
      setQty(qty-1);
      dispatch(decProductQty(product1));
    }
    
  }
  const removeProduct = (product) =>{
  
      dispatch(removeProductCart(product));
    
  }



  /*-------------------------------------------------------------------
  | Checkout Handler
  --------------------------------------------------------------------*/

  const checkoutHandler = ()=>{
      //console.log('cart item is ',cartItems)

      axios(API_BASE_URL+'/payment/checkout', {
        method: "post",
        data  : {cartItems:cartItems,shippingCost:shippingCost,loginUserId:loginUserId},
        withCredentials: true
      }).then(function (result) {
        console.log(result.data.status)
         if(result.data.status == true){
            window.location.href= result.data.msg;
          }else{
            toast.error(result.data.msg, {
                position: toast.POSITION.TOP_RIGHT,
              });
          }

      });


  }
  

  

  /*-------------------------------------------------------------------
  | Show cart icon on click
  --------------------------------------------------------------------*/

  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibilityCart = () => {
    setIsVisible(!isVisible);
  };


  let cartCheckoutclas = 'w-full absolute z-10 right-0 h-full overflow-x-hidden transform transition ease-in-out duration-700 translate-x-0';
  let cartCheckdivclas = 'w-full h-full bg-black dark:bg-gray-900 bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0 hidden';

  if(isVisible){
     
    cartCheckoutclas = 'w-full absolute z-10 right-0 h-full overflow-x-hidden transform transition ease-in-out duration-700 translate-x-full'; 
      
    setTimeout(function () {
        cartCheckdivclas = 'w-full h-full bg-black dark:bg-gray-900 bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0 hidden';

      }, 1000);

  }else{

     cartCheckdivclas = 'w-full h-full bg-black dark:bg-gray-900 bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0 ';

      setTimeout(function () {
        cartCheckoutclas = 'w-full absolute z-10 right-0 h-full overflow-x-hidden transform transition ease-in-out duration-700 translate-x-0'; 
      }, 1000);
  }

 const cartEmptyMsg = ()=>{
  if(!auth){
     toast.error("please login before checkout", {
      position: toast.POSITION.TOP_RIGHT,
     })
     navigate('/login')
  }else{
     toast.error("Cart is empty, please add product for checkout", {
      position: toast.POSITION.TOP_RIGHT,
     });
  }
   
 }
 


	return (
            <>
                { (auth && roleId == '65e5921305ce705cf3adc5cc') ?
                <ul className="navbar_ul" key={auth._id}>
                  <li><Link to="/">Product</Link></li>
                  <li><Link to="/add">Add Product</Link></li>
                  <li><Link to="/signup" onClick={logoutUser}>Logout ({(userData)?userData.name:'-'})</Link></li>   
                </ul>
                :
                
                <ul className="navbar_ul" key={auth._id}>

                  {auth && roleId != '65e5921305ce705cf3adc5cc' ? (
                           <> 
                              <li><Link to="/orders">My Orders</Link></li>
                              <li><Link to="/signup" onClick={logoutUser}>Logout ({(userData)?userData.name:'-'})</Link></li>  
                              <li><Link to="/shop">Shop</Link></li> 
                           </>
                          
                        ) : (
                          <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Sign Up</Link></li>
                            <li><Link to="/shop">Shop</Link></li>
                          </>
                  )}
      
                  <li className='cart_icon' onClick={toggleVisibilityCart}>
                        <div className="relative py-2">
                      <div className="t-0 absolute left-3">
                        <p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">{cartItems.length}</p>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="file: mt-4 h-6 w-6 bg-white-500 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                      </svg>
                    </div>
                  </li>

                </ul>


              }


                <div className={cartCheckdivclas} id="chec-div">

                      <div className={cartCheckoutclas} id="checkout">

                        <div className="flex items-end lg:flex-row flex-col justify-end" id="cart">
                          
                          <div className="bg-gray-100 pt-5">

                            <div className="flex items-center text-gray-500 hover:text-gray-600 dark:text-black cursor-pointer" onClick={toggleVisibilityCart}>
                              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="16" height="16" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <polyline points="15 6 9 12 15 18" />
                              </svg>
                              <p className="text-sm pl-2 text-black-900 leading-none dark:hover:text-gray-200">Back</p>
                            </div>
                              <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                              <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
                              <div className="rounded-lg md:w-2/3">
      
                              {
                                
                                cartItems.length>0 ? cartItems.map((item,index)=>
                                
                                    <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                                      <img src={API_BASE_URL+item.product_image} alt="product-image" className="w-full rounded-lg sm:w-40" />
                                      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                        <div className="mt-5 sm:mt-0">
                                          <h2 className="text-lg font-bold text-gray-900">{item.product_title}</h2>
                                          <p className="mt-1 text-xs text-gray-700"></p>
                                        </div>
                                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                          <div className="flex items-center border-gray-100">
                                            <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={()=>{qtyDecrease(item)}} > - </span>
                                            <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={item.qty}  min="1" />
                                            <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={()=>{qtyIncrease(item)}}> + </span>
                                          </div>
                                          <div className="flex items-center space-x-4">
                                            <p className="text-sm">₹{item.product_price}</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500" onClick={()=>{removeProduct(item)}}>
                                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    
                                  )
                                    : 'No item in cart'
                                  }

                                  </div>
                                

                                    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
                                      <div className="mb-2 flex justify-between">
                                        <p className="text-gray-700">Subtotal</p>
                                        <p className="text-gray-700">₹{subTotal}</p>
                                      </div>
                                      <div className="flex justify-between">
                                        <p className="text-gray-700">Shipping</p>
                                        <p className="text-gray-700">₹{shippingCost}</p>
                                      </div>
                                      <hr className="my-4" />
                                      <div className="flex justify-between">
                                        <p className="text-lg font-bold">Total</p>
                                        <div className="">
                                          <p className="mb-1 text-lg font-bold">₹{total}</p>
                                          <p className="text-sm text-gray-700">including VAT</p>
                                        </div>
                                      </div>
                                      {cartItems.length>0 ?<button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={checkoutHandler} >Check out</button>
                           :<button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600" onClick={cartEmptyMsg} >Check out</button>}
                                    
                                      
                                  </div>

                                </div>
                          </div>
                        </div>
                      </div>
                    </div> 
          
        
            </>
		)
    
	

}

export default Navbar