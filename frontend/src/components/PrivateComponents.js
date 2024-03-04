import React from 'react';
import axios from 'axios';
import {Navigate, Outlet} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

axios.defaults.withCredentials = true


const PrivateComponent = ()=>{
     
      const auth     = useSelector((state) => state.loginRes.isUserLogin);
      return auth?<Outlet />:<Navigate to='/signup' />
	
}

export default PrivateComponent