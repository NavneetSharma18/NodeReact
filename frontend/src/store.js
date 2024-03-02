import { configureStore } from '@reduxjs/toolkit'
import  reducerOne  from './redux/loginApi'

export const store = configureStore({
  reducer: {loginRes:reducerOne},
})