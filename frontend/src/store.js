import { configureStore } from '@reduxjs/toolkit'
import  reducerLogin  from './redux/loginApi'
import  reducerLogout  from './redux/logoutApi'

export const store = configureStore({
  reducer: {loginRes:reducerLogin,logoutRes:reducerLogout},
})