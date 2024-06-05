import React,{useState,useEffect} from 'react'
import { useNavigate,useSearchParams,Link }  from "react-router-dom";
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

	
	const [searchParams] = useSearchParams();
	const successMsg      = searchParams.get('session_id');

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
				console.log(res)
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
				{successMsg? 
					<div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
					<div class="flex">
					  <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
					  <div>
						<p class="font-bold">Thank you for shopping with us</p>
						<p class="text-sm">Track you order detail here <Link to={`/tankyou/?session_id=${successMsg}`}>Go to Other Page</Link> </p>
					  </div>
					</div>
				  </div>
				  :''
			    }
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