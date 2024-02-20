import React,{useState,useEffect} from 'react'
import { useNavigate }  from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Signup = ()=>{


	const [name,setName]         = useState("");
    const [email,setEmail]       = useState("");
    const [password,setPassword] = useState("");
    const [error,setError]       = useState(false)
    
    const navigate               = useNavigate();
    const auth                   = localStorage.getItem('user')

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

    	let result = await fetch('http://127.0.0.1:2000/user/register',{
						    		  method:'post',
						    		  headers: {
									    'Content-Type': 'application/json;charset=utf-8'
									  },
									  body:JSON.stringify({name,email,password})
						    	})

        // get data from promise

    	result = await result.json();

    	if(result.status == true){

    		const res     = result.data;
    		delete res.password;
    		const user    = JSON.stringify(res);
    		const token   = result.token;

	    	localStorage.setItem('user',user);
	    	localStorage.setItem('token',token);

	    	if(result){
	    		navigate('/');
	    	}
    	}else{
    		 toast.error(result.msg, {
			      position: toast.POSITION.TOP_RIGHT,
			    });
			return false;
    	}
    	
    	
	
    }

	return (
	    
		<div className="register_div">
		 <h2> Signup | Register</h2>
		 <input className="inputBox" value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Enter Name"/>
		 <input className="inputBox" value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder="Enter Email"/>
		 <input className="inputBox" value={password} onChange={(e)=>{setPassword(e.target.value)}} type="text" placeholder="Enter Password"/>
		 <button onClick={sendData} className="appButton">Sign Up</button>
		
		</div>
	)

}

export default Signup