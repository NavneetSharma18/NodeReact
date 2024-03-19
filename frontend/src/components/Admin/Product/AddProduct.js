import React,{useState,useEffect, useRef} from 'react'
import { useNavigate }  from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
axios.defaults.withCredentials = true


const AddProduct = ()=>{

	const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

	const [product_title,setName]       = useState("");
    const [product_description,setDesc] = useState("");
    const [product_price,setPrice]      = useState("");
    const [error,setError]              = useState(false);
    
    const navigate                      = useNavigate();
    const userData                      = useSelector((state) => state.loginRes.authData);
    const auth                          = useSelector((state) => state.loginRes.isUserLogin);
    const product_img_ref               = useRef('');

    const sendProductData = async ()=>{

    		if(!product_title || !product_description || !product_price  ){
    			
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
    			// if(!filename){
    			// 	toast.error('Product image can`t be blank..', {
				//       position: toast.POSITION.TOP_RIGHT,
				//     });
				//     return false;
    			// }
    			return false;
    		}


    	/*---------------------------------
    	| Send data to Node Js Api
    	-----------------------------------*/

    	

    	const  user_id   = userData._id;
    	const  imagedata = product_img_ref.current.files[0];
	    let    formData  = new FormData();
      formData.append('product_image',imagedata);
      formData.append('product_title',product_title);
      formData.append('product_description',product_description);
      formData.append('product_price',product_price);
      
    	 axios(API_BASE_URL+'/product/add-product', {
              method: "post",
              data  : formData,
              withCredentials: true
            }).then(function (result) {

            	 result = result.data
            	 if(result.status == true){

			    		toast.success('Product added successfully!', {
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
    		 <h2> Add Product</h2>
    		 <input className="inputBox" value={product_title} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Enter Product Name"/>
    		 <input className="inputBox" value={product_description} onChange={(e)=>{setDesc(e.target.value)}} type="textarea" placeholder="Enter Product Description"/>
    		 <input className="inputBox" value={product_price} onChange={(e)=>{setPrice(e.target.value)}} type="text" placeholder="Enter Product Price"/>
    		 <input className="inputBox" type="file" accept="image/*" ref={product_img_ref}  />
    		 <div className="appButtonWrp">
                <button onClick={sendProductData} className="appButton">Add Product</button>
             </div>
    		</div>
        </div>
	)

}

export default AddProduct