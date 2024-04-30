import React,{useState,useEffect} from 'react'
import { Link, useNavigate }  from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
axios.defaults.withCredentials = true



const Orders = ()=>{

	const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

    const [orders,setOrders]  = React.useState([]); 
    const navigate                = useNavigate();
    const auth                    = useSelector((state) => state.loginRes.isUserLogin);
    const userId                  = useSelector((state) => state.loginRes.userId);

    useEffect(()=>{

    	getOrders();
    },[])

    const getOrders = async ()=>{    	

    	/*---------------------------------
    	| Get products data to Node Js Api
    	-----------------------------------*/

    	const user_id = (auth)?auth._id:'';

    	  axios(API_BASE_URL+"/user/get-orders", {
              method: "post",
              data:{userId:userId},
              withCredentials: true
            }).then(function (result) {
            		result = result.data
            	   if(result.status == true){
                            setOrders(result.msg);
                    }else{

                        toast.warning(result.msg, {
                            position: toast.POSITION.TOP_RIGHT,
                        });
                    }
            });
    	
    }

    const viewOrderDetail = async(orderId)=>{
        console.log('order id is',orderId)
        
    }


	return (

		<div className="register_div">
		 <h2> All Orders</h2>
		 <table>
		 <tbody>
			  <tr>
			     <th>Sr. No</th>
			     <th>Order Id</th>
			     <th>Sub Total</th>
			     <th>Total</th>
			     <th>Address</th>
			     <th>Delivery Status</th>
                 <th>Payment Status</th>
                 <th>Action</th>
                 
			  </tr>
			  {
			  	orders.length>0 ? orders.map((item,index)=>

			  		<tr key={index}>

					    <td>{index+1}</td>
					    <td>{item._id}</td>
					    <td>{item.sub_total}</td>
					    <td>₹{item.total}</td>
                        <td>...</td>
                        <td>{item.delivery_status}</td>
                        <td>{item.payment_status}</td>
                        <td><a className='btn btn-primary btn-sm' onClick={()=> viewOrderDetail(item._id)}>View</a></td>
					   
					  </tr>
			  	)
			  	:<tr><td colSpan="7" className="no_result">No result found..</td></tr>
			  }
			  
			 </tbody>
			</table>

		
		</div>
	)

}

export default Orders