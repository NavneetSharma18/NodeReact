import React,{useState,useEffect} from 'react'
import { Link, useNavigate }  from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
axios.defaults.withCredentials = true


const AllProduct = ()=>{

	
    const [products,setProducts]  = React.useState([]); 
    const navigate                = useNavigate();
    const auth                    = localStorage.getItem('user');
    

    useEffect(()=>{

    	getProducts();
    },[])

    const getProducts = async ()=>{    	

    	/*---------------------------------
    	| Get products data to Node Js Api
    	-----------------------------------*/

    	const user_id = JSON.parse(auth)._id;

    	  axios("http://localhost:2000/product/get-product", {
              method: "get",
              withCredentials: true
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

    const deleteProduct = async (id)=>{



    	 axios('http://localhost:2000/product/delete-product/'+id, {
              method: "delete",
              withCredentials: true
            }).then(function (result) {
            	
            	result = result.data
				    	if(result.status == true){
				    		toast.success(result.msg, {
						      position: toast.POSITION.TOP_RIGHT,
						    });
				    		getProducts();
				    	}else{
				    		toast.error(result.msg, {
						      position: toast.POSITION.TOP_RIGHT,
						    });
				    	}
            });

    	
    }

    const searchProduct = async(event)=>{

    	const key = event.target.value;

    	if(key){

    			axios('http://localhost:2000/product/search/'+key, {
	              method: "get",
	              withCredentials: true
	            }).then(function (result) {
	            	
	            	 result = result.data
	            	 if(result.status == true){
						    		setProducts(result.msg);
						    		
						    	}else{
						    		toast.error(result.msg, {
								      position: toast.POSITION.TOP_RIGHT,
								    });
						    	}
	            });

		    	

    	}else{
    		getProducts();
    	}
    }

	return (

		<div className="register_div">
		 <h2> All Product</h2>
		 <input type="text" className="search_box" placeholder="Search product" onChange={searchProduct} />
		 <table>
			  <tr>
			     <th>Sr. No</th>
			     <th>Product Name</th>
			     <th>Product Description</th>
			     <th>Product Price</th>
			     <th>Action</th>
			  </tr>
			  {
			  	products.length>0 ? products.map((item,index)=>

			  		<tr>
					    <td>{index+1}</td>
					    <td>{item.product_title}</td>
					    <td>{item.product_description}</td>
					    <td>₹{item.product_price}</td>
					    <td><button className='btn btn-danger' onClick={()=>deleteProduct(item._id)}>Delete</button>
					    	<Link className='btn btn-primary' to={"/update/"+item._id}>Update</Link>
					    </td>
					  </tr>
			  	)
			  	:<tr > <td colspan="5" className="no_result">No result found..</td></tr>
			  }
			  

			</table>

		
		</div>
	)

}

export default AllProduct