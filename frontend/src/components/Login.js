import React,{useState,useEffect} from 'react'
import { useNavigate }  from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from 'react-redux'
import {checkLogin} from '../redux/userApi/';





const Login = ()=>{

    const [email,setEmail]       = useState("");
    const [password,setPassword] = useState("");
    const [error,setError]       = useState(false);
    const navigate               = useNavigate();
    const dispatch               = useDispatch();
    const auth                   = useSelector((state) => state.loginRes.isUserLogin);

    useEffect(()=>{

  		if(auth){
  			navigate('/')
  		}

  	})

    const sendLoginData = async ()=>{

    	if(!email || !password){

    		setError(true);

    		if(error && !email){

    			toast.error('Please enter your email', {
			      position: toast.POSITION.TOP_RIGHT,
			    });
			    return false;
    		}
    		if(error && !password){

    			toast.error('Please enter your password', {
			      position: toast.POSITION.TOP_RIGHT,
			    });
			    return false;
    		}
    		
    		return false;
    		
    	}

    	const data = {email: email,password: password};
        dispatch(checkLogin(data));
   }

	return (
    <div className="register_div">
  		<div className="register_div1">
  		 <h2> Login </h2>
  		 <input className="inputBox" value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder="Enter Email"/>
  		 <input className="inputBox" value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Enter Password"/>
  		 <div className="appButtonWrp">
        <button onClick={sendLoginData} className="appButton">Login</button>
        </div>
        
  		</div>
    </div>
	)

}

export default Login