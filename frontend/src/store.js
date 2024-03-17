import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit'
import  reducerLogin   from './redux/userApi'
import  reducerProduct from './redux/productApi'
import {thunk} from 'redux-thunk';


export const store = configureStore({
  reducer: {
            loginRes  :reducerLogin,
            cartItem  :reducerProduct
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})