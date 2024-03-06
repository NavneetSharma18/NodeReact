import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit'
import  reducerLogin  from './redux/userApi'
import {thunk} from 'redux-thunk';


export const store = configureStore({
  reducer: {
            loginRes:reducerLogin
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})