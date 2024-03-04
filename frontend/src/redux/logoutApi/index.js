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

 export const userLogout = createAsyncThunk('userLogout',async()=>{

         const result  = await axios("http://localhost:2000/user/logout", {
                               method: "get",
                               withCredentials: true
                            });
        return result.data;
  })




export const logoutApiSlice = createSlice({

  name: 'check_logout_api',
  initialState,
  extraReducers: (builder) => {

    builder.addCase(userLogout.pending, (state, action) => {
      state.isLoading  = true;
      state.authData   = action.payload;
    })
    builder.addCase(userLogout.fulfilled, (state, action) => {

        const res = action.payload;

        if(res.status == true){

          state.isLoading   = false;
          state.authData    = action.payload;
          state.isError     = false; 
          state.isUserLogin = false;
          state.userRoleId  = null;
          state.userId      = null;

           toast.success(res.msg, {
             position: toast.POSITION.TOP_RIGHT,
           });

           

        }
      
      
    })
    builder.addCase(userLogout.rejected, (state, action) => {
      state.isLoading  = false;
      state.authData   = action.payload;
      state.isError    = true;
    })

  }
})

export default logoutApiSlice.reducer