import React,{useState,useEffect} from 'react'
import { useNavigate }  from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from 'react-redux'
import {addProductToCart} from '../../redux/productApi/';

import axios from 'axios';
axios.defaults.withCredentials = true


const Shop = ()=>{

	const  navigate               = useNavigate();
	const [products,setProducts]  = React.useState([]);
	const auth                    = useSelector((state) => state.loginRes.userId);
	const dispatch                = useDispatch();
	const API_BASE_URL            = process.env.REACT_APP_API_BASE_URL
 

	useEffect(()=>{

    	getProducts();
    },[])

    const getProducts = async ()=>{    	

    	/*---------------------------------
    	| Get products data to Node Js Api
    	-----------------------------------*/
        
    	const user_id = (auth)?auth:'';

    	  axios(API_BASE_URL+"/user/get-product", {
              method: "get",
              //withCredentials: true
            }).then(function (result) {
            		result = result.data
            	 if(result.status == true){
					    		setProducts(result.msg);
					    	}else{

					    	    toast.warning(result.msg, {
							      position: toast.POSITION.TOP_RIGHT,
							    });
					    	}
            });
    	
    }

    const productAddToCart = async (product)=>{
		const product1 = JSON.parse(JSON.stringify(product))
        product1.qty   = 1;

		auth?dispatch(addProductToCart(product1)):
		 toast.warning('Please login before shopping', {
			position: toast.POSITION.TOP_RIGHT,
		  });
		 navigate('/login')
    }

	return (

		<div className="register_div">
				    
				<div className="max-w-1xl mx-auto container mx-auto grid grid-cols-4 gap-4">

					{
					  	products.length>0 ? products.map((item,index)=>
					  		<div key={index} className="bg-white shadow-md rounded-lg max-w-sm dark:bg-gray-800 dark:border-gray-700 p-3">
								<a href="#">
									<img className="rounded-t-lg p-8" src={API_BASE_URL+item.product_image} alt="product image" />
						        </a>
									<div className="px-5 pb-5">
										<a href="#">
											<h3 className="text-gray-900 font-semibold text-xl tracking-tight dark:text-white">{item.product_title}</h3>
										</a>
										<div className="flex items-center mt-2.5 mb-5">
											<svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg">
												<path
													d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
												</path>
											</svg>
											<svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg">
												<path
													d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
												</path>
											</svg>
											<svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg">
												<path
													d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
												</path>
											</svg>
											<svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg">
												<path
													d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
												</path>
											</svg>
											<svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20"
												xmlns="http://www.w3.org/2000/svg">
												<path
													d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z">
												</path>
											</svg>
											<span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">5.0</span>
										</div>
										<div className="flex items-center justify-between">
											<span className="text-3xl font-bold text-gray-900 dark:text-white">₹{item.product_price}</span>
											<a key={index} className="add_to_cart text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>{productAddToCart(item)}}>Add to cart</a>
										</div>
									</div>
							</div>
					  		
					  	)
					  	:'No result found'
					  }
					

				</div>
        </div>
	)

}

export default Shop