import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from 'react-redux'
import {userLogout} from '../../redux/logoutApi/';

axios.defaults.withCredentials = true


const Navbar = ()=>{

	const auth     = useSelector((state) => state.loginRes.isUserLogin);
	const userData = useSelector((state) => state.loginRes.authData);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	
	const logoutUser = ()=>{


		 dispatch(userLogout());
		 navigate('/signup');

		 console.log('after logout state is ',userData);
		 

		// axios("http://localhost:2000/user/logout", {
        //       method: "get",
        //       withCredentials: true
        //     }).then(function (result) {

        //     	 result = result.data;
            	 
        //     	 if(result.status == true){

        //     	 		toast.warning(result.msg, {
		// 			      position: toast.POSITION.TOP_RIGHT,
		// 			    });
		    			
	  	// 			    navigate('/signup')
		//     	}else{

		//     	    toast.warning(result.msg, {
		// 		      position: toast.POSITION.TOP_RIGHT,
		// 		    });
		//     	}
        //     });

	   
	}


	return (
		     <div >
			      { auth?
			    	<ul className="navbar_ul">
					    <li><Link to="/">Product</Link></li>
					    <li><Link to="/add">Add Product</Link></li>
					    <li><Link to="/signup" onClick={logoutUser}>Logout ({(userData)?((userData.data)?userData.data.name:'-'):'-'})</Link></li>   
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