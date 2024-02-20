import React,{useState,useEffect} from 'react'
import { useNavigate }  from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const AddProduct = ()=>{


	const [product_title,setName]       = React.useState("");
    const [product_description,setDesc] = React.useState("");
    const [product_price,setPrice]      = React.useState("");
    const [error,setError]              = React.useState(false);
    
    const navigate               = useNavigate();
    const auth                   = localStorage.getItem('user');
    const token                  = localStorage.getItem('token');

    const sendProductData = async ()=>{

    		if(!product_title || !product_description || !product_price){
    			
    			setError(true);

    			if(!product_title){
    				toast.error('Please enter product title', {
				      position: toast.POSITION.TOP_RIGHT,
				    });
				    return false;
    			}

    			if(!product_description){
    				toast.error('Please enter product description', {
				      position: toast.POSITION.TOP_RIGHT,
				    });
				    return false;
    			}

    			if(!product_price){
    				toast.error('Please enter product price', {
				      position: toast.POSITION.TOP_RIGHT,
				    });
				    return false;
    			}
    			return false;
    		}


    	/*---------------------------------
    	| Send data to Node Js Api
    	-----------------------------------*/

    	const user_id = JSON.parse(auth)._id;
    	let result    = await fetch('http://127.0.0.1:2000/product/add-product',{
						    		  method:'post',
						    		  headers: {
									    'Content-Type': 'application/json;charset=utf-8',
									    'authorization':'Bearer '+token
									  },
									  body:JSON.stringify({product_title,product_description,product_price,user_id})
						    	})

        // get data from promise

    	result = await result.json();
   		
    	if(result){

    		toast.success('Product added successfully!', {
		      position: toast.POSITION.TOP_RIGHT,
		    });

    		navigate('/');
    	}
    	
	
    }

	return (

		<div className="register_div">
		 <h2> Add Product</h2>
		 <input className="inputBox" value={product_title} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Enter Product Name"/>
		 <input className="inputBox" value={product_description} onChange={(e)=>{setDesc(e.target.value)}} type="textarea" placeholder="Enter Product Description"/>
		 <input className="inputBox" value={product_price} onChange={(e)=>{setPrice(e.target.value)}} type="text" placeholder="Enter Product Price"/>
		 <button onClick={sendProductData} className="appButton">Add Product</button>
		
		</div>
	)

}

export default AddProduct