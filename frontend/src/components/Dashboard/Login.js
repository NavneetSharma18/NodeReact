import React,{useState,useEffect} from 'react'
import { useNavigate }  from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
axios.defaults.withCredentials = true




const Login = ()=>{

    const [email,setEmail]       = useState("");
    const [password,setPassword] = useState("");
    const [error,setError]       = useState(false);
    const navigate               = useNavigate();
    const auth                   = localStorage.getItem('user')

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
    	

    	/*---------------------------------
    	| Send data to Node Js Api
    	-----------------------------------*/

    	// let result = await fetch('http://127.0.0.1:2000/user/login',{
					// 	    		  method:'post',
					// 	    		  headers: {
					// 				    'Content-Type': 'application/json;charset=utf-8'
					// 				  },
					// 				  body:JSON.stringify({email,password})
					// 	    	})

        axios("http://127.0.0.1:2000/user/login", {
              method: "post",
              data: {email: email,password: password},
              withCredentials: true
            }).then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

        return false;

        // get data from promise

    	// result = await result.json();

    	// if(result.status == false){

    	// 	toast.error(result.msg, {
		   //    position: toast.POSITION.TOP_RIGHT,
		   //  });

    	// }else{

    	// 	toast.success(result.msg, {
		   //    position: toast.POSITION.TOP_RIGHT,
		   //  });

		   //  const user  = JSON.stringify(result.data);
		   //  const token = result.token;
		    
    	//     localStorage.setItem('user',user);
    	//     localStorage.setItem('token',token);

    	//     if(result){
    	// 	 navigate('/');
    	//     }
    	// }
    	
    	
    	
	
    }

	return (
		<div className="register_div">
		 <h2> Login </h2>
		 <input className="inputBox" value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text" placeholder="Enter Email"/>
		 <input className="inputBox" value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" placeholder="Enter Password"/>
		 <button onClick={sendLoginData} className="appButton">Login</button>
		
		</div>
	)

}

export default Login