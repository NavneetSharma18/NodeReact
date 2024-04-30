import React from 'react';
import axios from 'axios';
import {Navigate, Outlet} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'

axios.defaults.withCredentials = true


const PrivateComponent = ()=>{
     
      const auth     = useSelector((state) => state.loginRes.isUserLogin);
      const roleId   = useSelector((state) => state.loginRes.userRoleId);
      return auth && roleId == '65e5921305ce705cf3adc5cc' ?<Outlet />:( auth && roleId != '65e5921305ce705cf3adc5cc')?<Navigate to='/orders' />:<Navigate to='/signup' />
	
}

export default PrivateComponent