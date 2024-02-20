import React from 'react'
import {Link,useNavigate} from 'react-router-dom'



const Navbar = ()=>{

	const auth     = localStorage.getItem('user')
	const navigate = useNavigate();
	
	const logoutUser = ()=>{

	   localStorage.clear();
	   navigate('/signup')
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