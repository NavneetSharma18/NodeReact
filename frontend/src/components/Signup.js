import React,{useState,useEffect} from 'react'
import { useNavigate }  from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';

axios.defaults.withCredentials = true


const Signup = ()=>{


	const [name,setName]         = useState("");
    const [email,setEmail]       = useState("");
    const [password,setPassword] = useState("");
    const [error,setError]       = useState(false)

	const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

    
    const navigate               = useNavigate();
    const auth                   = useSelector((state) => state.loginRes.isUserLogin);

    useEffect(()=>{

		if(auth){
			navigate('/')
		}
	})

    const sendData = async ()=>{

    	
    	if(!name || !email || !password){

    		setError(true);

    		if(error && !name){

    			toast.error('Please enter your name', {
			      position: toast.POSITION.TOP_RIGHT,
			    });
			    return false;
    		}
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
    	

    	/*---------------------------------
    	| Send data to Node Js Api
    	-----------------------------------*/

    	axios(API_BASE_URL+'/user/register', {
              method: "post",
              data: {name,email,password},
              withCredentials: true
            }).then(function (res) {

            const result = res.data;
            if(result.status == true){

	    		const res     = result.data;
	    		delete res.password;
	    		const user    = JSON.stringify(res);
	    		const token   = result.token;

	    		toast.success(result.msg, {
				      position: toast.POSITION.TOP_RIGHT,
				    });

		    	if(result){
		    		navigate('/login');
		    	}
	    	}else{
	    		 toast.error(result.msg, {
				      position: toast.POSITION.TOP_RIGHT,
				    });
				return false;
	    	}
           });

	
    }

	return (
	    <div className="register_div">
			<div className="register_div1">
			 <h2> Signup | Register</h2>
			 <input className="inputBox" value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Enter Name"/>
			 <input className="inputBox" value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder="Enter Email"/>
			 <input className="inputBox" value={password} onChange={(e)=>{setPassword(e.target.value)}} type="text" placeholder="Enter Password"/>
			 <div className="appButtonWrp">
			   <button onClick={sendData} className="appButton">Sign Up</button>
			  </div>
			
			</div>
		</div>
	)

}

export default Signup