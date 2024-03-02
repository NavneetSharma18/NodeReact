import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
axios.defaults.withCredentials = true


const initialState = {
  isLoading:false,
  authData :null,
  isError  :false,
}

 export const checkLogin = createAsyncThunk('checkLogin',async(sendData)=>{

         const result  = await axios("http://localhost:2000/user/login", {
                                method: "post",
                                data: {email: sendData.email,password: sendData.password},
                                withCredentials: true
                            });
        return result.data;
  })

export const loginApiSlice = createSlice({

  name: 'check_login_api',
  initialState,
  extraReducers: (builder) => {

    builder.addCase(checkLogin.pending, (state, action) => {
      state.isLoading = true;
      state.isError   = false;
    })
    builder.addCase(checkLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.authData  = action.payload;
      state.isError   = false; 
      
    })
    builder.addCase(checkLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.authData  = action.payload;
      state.isError   = true;
    })

  }
})

export default loginApiSlice.reducer