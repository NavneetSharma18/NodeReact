import React,{useState,useEffect} from 'react'
import { useNavigate, useParams }  from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const UpdateProduct = ()=>{

	const param = useParams();

	useEffect(()=>{
			getSingleProduct(param)
	},[])

	const [product_title,setName]       = React.useState("");
    const [product_description,setDesc] = React.useState("");
    const [product_price,setPrice]      = React.useState("");
    const [error,setError]              = React.useState(false);
    
    const navigate               = useNavigate();
    const auth                   = localStorage.getItem('user');
    const token                  = localStorage.getItem('token');

    const getSingleProduct = async (param)=>{
		
		// Get product by Id
    	let result    = await fetch('http://127.0.0.1:2000/product/get-single-product/'+param.id,{
						    		  method:'get',
						    		  headers: {
									    'Content-Type': 'application/json;charset=utf-8',
									    'authorization':'Bearer '+token
									  }
						    	})

    	result = await result.json();

    	if(result.status == true){

    		setName(result.msg.product_title);
    		setDesc(result.msg.product_description);
    		setPrice(result.msg.product_price);

    	}else{

    	    toast.warning(result.msg, {
		      position: toast.POSITION.TOP_RIGHT,
		    });
    	}

    }

    const updateProductData = async ()=>{
    	
    	let result    = await fetch('http://127.0.0.1:2000/product/update-product/'+param.id,{
						    		  method:'put',
						    		  headers: {
									    'Content-Type': 'application/json;charset=utf-8',
									    'authorization':'Bearer '+token
									  },
									  body:JSON.stringify({product_title,product_description,product_price})
						    	})

    	 result = await result.json();
   		
    	 if(result){


    		toast.success(result.msg, {
		      position: toast.POSITION.TOP_RIGHT,
		    });
		    navigate('/');

    	 }else{

    	 	toast.error(result.msg, {
		      position: toast.POSITION.TOP_RIGHT,
		    });
    	 }
    }

	return (

		<div className="register_div">
		 <h2> Update Product</h2>
		 <input className="inputBox" value={product_title} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Enter Product Name"/>
		 <input className="inputBox" value={product_description} onChange={(e)=>{setDesc(e.target.value)}} type="textarea" placeholder="Enter Product Description"/>
		 <input className="inputBox" value={product_price} onChange={(e)=>{setPrice(e.target.value)}} type="text" placeholder="Enter Product Price"/>
		 <button onClick={updateProductData} className="appButton">Update Product</button>
		
		</div>
	)

}

export default UpdateProduct