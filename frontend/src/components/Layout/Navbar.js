import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from 'react-redux'
import {checkLogout} from '../../redux/userApi/';

axios.defaults.withCredentials = true


const Navbar = ()=>{

	const auth     = useSelector((state) => state.loginRes.isUserLogin);
	const userData = useSelector((state) => state.loginRes.authData);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	
	const logoutUser = ()=>{

		 dispatch(checkLogout());
		 navigate('/login');
	   
	}


	return (
		     <div >
			      { auth?
			    	<ul className="navbar_ul">
					    <li><Link to="/">Product</Link></li>
					    <li><Link to="/add">Add Product</Link></li>
					    <li><Link to="/signup" onClick={logoutUser}>Logout ({(userData)?userData.name:'-'})</Link></li>   
					</ul>
			      :
				    <ul className="navbar_ul">
					    <li><Link to="/signup">Sign Up</Link></li>  
					     <li><Link to="/login">Login</Link></li> 
					     <li><Link to="/shop">Shop</Link></li> 
					</ul>
			     }
			
		
		     </div>
		)
    
	

}

export default Navbar