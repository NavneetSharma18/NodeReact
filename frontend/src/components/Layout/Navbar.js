import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.withCredentials = true


const Navbar = ()=>{

	const auth     = localStorage.getItem('user')
	const navigate = useNavigate();
	
	const logoutUser = ()=>{

		axios("http://localhost:2000/user/logout", {
              method: "get",
              withCredentials: true
            }).then(function (result) {

            	 result = result.data;
            	 
            	 if(result.status == true){

            	 		toast.warning(result.msg, {
					      position: toast.POSITION.TOP_RIGHT,
					    });
		    			localStorage.clear();
	  				    navigate('/signup')
		    	}else{

		    	    toast.warning(result.msg, {
				      position: toast.POSITION.TOP_RIGHT,
				    });
		    	}
            });

	   
	}


	return (
		     <div >
			      { auth?
			    	<ul className="navbar_ul">
					    <li><Link to="/">Product</Link></li>
					    <li><Link to="/add">Add Product</Link></li>
					    <li><Link to="/signup" onClick={logoutUser}>Logout ({JSON.parse(auth).name})</Link></li>   
					</ul>
			      :
				    <ul className="navbar_ul">
					    <li><Link to="/signup">Sign Up</Link></li>  
					     <li><Link to="/login">Login</Link></li> 
					</ul>
			     }
			
		
		     </div>
		)
    
	

}

export default Navbar