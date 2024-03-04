import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
axios.defaults.withCredentials = true


const initialState = {
  isLoading  :false,
  authData   :null,
  isError    :false,
  isUserLogin:false,
  userRoleId :null,
  userId     :null,

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
      state.isLoading  = true;
      state.authData   = action.payload;
    })
    builder.addCase(checkLogin.fulfilled, (state, action) => {

        const res = action.payload;

        if(res.status == true){

          state.isLoading   = false;
          state.authData    = action.payload;
          state.isError     = false; 
          state.isUserLogin = true;
          state.userRoleId  = res.data.role_id;
          state.userId      = res.data._id;

           toast.success(res.msg, {
             position: toast.POSITION.TOP_RIGHT,
           });

        }else{

              state.isLoading  = false;
              state.authData   = action.payload;
              state.isError    = true;
              state.isUserLogin= false;
              state.userRoleId = null;
              state.userId     = null;

               toast.error(res.msg, {
                  position: toast.POSITION.TOP_RIGHT,
               });
        } 
      
      
    })
    builder.addCase(checkLogin.rejected, (state, action) => {
      state.isLoading  = false;
      state.authData   = action.payload;
      state.isError    = true;
    })

  }
})

export default loginApiSlice.reducer