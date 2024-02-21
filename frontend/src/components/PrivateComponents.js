import React from 'react';
import axios from 'axios';
import {Navigate, Outlet} from 'react-router-dom';

axios.defaults.withCredentials = true


const PrivateComponent = ()=>{
    
	 const auth = localStorage.getItem('user')
     return auth?<Outlet />:<Navigate to='/signup' />
	
}

export default PrivateComponent