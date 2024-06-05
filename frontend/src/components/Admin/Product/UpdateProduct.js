import React,{useState,useEffect} from 'react'
import { useNavigate, useParams }  from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
axios.defaults.withCredentials = true


const UpdateProduct = ()=>{

	const param = useParams();

	useEffect(()=>{
			getSingleProduct(param)
	},[])

	const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

	const [product_title,setName]       = React.useState("");
    const [product_description,setDesc] = React.useState("");
    const [product_price,setPrice]      = React.useState("");
    const [error,setError]              = React.useState(false);
    
    const navigate               = useNavigate();
    const auth                   = useSelector((state) => state.loginRes.isUserLogin);
    

    const getSingleProduct = async (param)=>{
		
		// Get product by Id

		 axios(API_BASE_URL+'/product/get-single-product/'+param.id, {
              method: "get",
              withCredentials: true
            }).then(function (result) {

            	 result = result.data
            	 if(result.status == true){

			    		setName(result.msg.product_title);
			    		setDesc(result.msg.product_description);
			    		setPrice(result.msg.product_price);

			    	}else{

			    	    toast.warning(result.msg, {
					      position: toast.POSITION.TOP_RIGHT,
					    });
			    	}
            });

    }

    const updateProductData = async ()=>{
    	


    	 axios(API_BASE_URL+'/product/update-product/'+param.id, {
              method: "put",
              data: {product_title,product_description,product_price},
              withCredentials: true
            }).then(function (result) {

            	 result = result.data
            	 if(result.status == true){

		    		toast.success(result.msg, {
				      position: toast.POSITION.TOP_RIGHT,
				    });
				    navigate('/');

		    	 }else{

		    	 	toast.error(result.msg, {
				      position: toast.POSITION.TOP_RIGHT,
				    });
		    	 }

            });

    }

	return (

		<div className="register_div">
			<div className="register_div1">
			 <h2> Update Product</h2>
			 <input className="inputBox" value={product_title} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Enter Product Name"/>
			 <input className="inputBox" value={product_description} onChange={(e)=>{setDesc(e.target.value)}} type="textarea" placeholder="Enter Product Description"/>
			 <input className="inputBox" value={product_price} onChange={(e)=>{setPrice(e.target.value)}} type="text" placeholder="Enter Product Price"/>
			 <button onClick={updateProductData} className="appButton">Update Product</button>
			
			</div>
		</div>
	)

}

export default UpdateProduct