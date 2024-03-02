import React,{useState,useEffect} from 'react'
import { useNavigate }  from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from 'react-redux'
import {checkLogin} from '../../redux/loginApi/';





const Login = ()=>{

    const [email,setEmail]       = useState("");
    const [password,setPassword] = useState("");
    const [error,setError]       = useState(false);
    const navigate               = useNavigate();

    const dispatch = useDispatch();
    const apiRes   = useSelector((state) => state.loginRes.authData);
    const auth     = (apiRes)?(apiRes.data?apiRes.data:''):''

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
          

    	/*---------------------------------
    	| Send data to Node Js Api
    	-----------------------------------*/

        //   axios("http://localhost:2000/user/login", {
        //       method: "post",
        //       data: {email: email,password: password},
        //       withCredentials: true
        //     }).then(function (res) {

        //           const result = res.data;

        //           if(result.status == false){

        //     	    		  toast.error(result.msg, {
        //     			       position: toast.POSITION.TOP_RIGHT,
        //     			      });

        //     	    	}else{

        //     	    		  toast.success(result.msg, {
        //     			        position: toast.POSITION.TOP_RIGHT,
        //     			      });

        //     			      const user  = JSON.stringify(result.data);
        //     			      localStorage.setItem('user',user);

        //     	    	     if(result){
        //     	    		    navigate('/');
        //     	    	     }
        //     	    	}

        //   })
        //   .catch(function (error) {

        //          toast.error(error, {
			     //       position: toast.POSITION.TOP_RIGHT,
			     // });
        //   });
  	
	
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
        <h1>{apiRes?apiRes.data.name:''}</h1>
  		</div>
    </div>
	)

}

export default Login