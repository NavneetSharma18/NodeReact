import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
axios.defaults.withCredentials = true

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

const initialState = {
  isLoading  :false,
  authData   :null,
  isError    :false,
  isUserLogin:false,
  userRoleId :null,
  userId     :null,

}



/*-------------------------------------------------
| Create Redux Thunk For Api Call ASYNC
---------------------------------------------------*/

export const actionAddProduct = (senddata) => async (dispatch) => {

    try {   

            const res  = await axios(API_BASE_URL+"user/login", {
                                  method: "post",
                                  data: {email: senddata.email,password: senddata.password},
                                  withCredentials: true
                              });
           const resp = res.data;

            if (resp.status == true) {

                 const user = resp.data;
                 toast.success(resp.msg, {
                   position: toast.POSITION.TOP_RIGHT,
                 });
                 dispatch(loginUser(user));

            }else{

                toast.error(resp.msg, {
                  position: toast.POSITION.TOP_RIGHT,
                });
            }

    }catch (error) {

            toast.error('Error during login:'+error, {
              position: toast.POSITION.TOP_RIGHT,
            });
    }


}

export const actionDeleteProduct = () => async (dispatch) => {

    try {   

            const res  = await axios(API_BASE_URL+"user/logout", {
                               method: "get",
                               withCredentials: true
                            });
            const resp = res.data;

            if (resp.status == true) {

                 const user = resp.data;
                 toast.success(resp.msg, {
                   position: toast.POSITION.TOP_RIGHT,
                 });
                 dispatch(logoutUser());

            }else{

                toast.error(resp.msg, {
                  position: toast.POSITION.TOP_RIGHT,
                });
            }

    }catch (error) {

            toast.error('Error during logout:'+error, {
              position: toast.POSITION.TOP_RIGHT,
            });
    }


}

export const actionUpdateProduct = () => async (dispatch) => {

    try {   

            const res  = await axios(API_BASE_URL+"user/logout", {
                               method: "get",
                               withCredentials: true
                            });
            const resp = res.data;

            if (resp.status == true) {

                 const user = resp.data;
                 toast.success(resp.msg, {
                   position: toast.POSITION.TOP_RIGHT,
                 });
                 dispatch(logoutUser());

            }else{

                toast.error(resp.msg, {
                  position: toast.POSITION.TOP_RIGHT,
                });
            }

    }catch (error) {

            toast.error('Error during logout:'+error, {
              position: toast.POSITION.TOP_RIGHT,
            });
    }


}

export const actionAllProduct = () => async (dispatch) => {

    try {   

            const res  = await axios(API_BASE_URL+"user/logout", {
                               method: "get",
                               withCredentials: true
                            });
            const resp = res.data;

            if (resp.status == true) {

                 const user = resp.data;
                 toast.success(resp.msg, {
                   position: toast.POSITION.TOP_RIGHT,
                 });
                 dispatch(logoutUser());

            }else{

                toast.error(resp.msg, {
                  position: toast.POSITION.TOP_RIGHT,
                });
            }

    }catch (error) {

            toast.error('Error during logout:'+error, {
              position: toast.POSITION.TOP_RIGHT,
            });
    }


}


/*-------------------------------------------------
| Create Redux Slice and Reducer Function
---------------------------------------------------*/


export const productApiSlice = createSlice({

  name: 'product_api',
  initialState,
  reducers: {

          addProduct: (state, action) => {

                  state.isLoading   = false;
                  state.authData    = action.payload;
                  state.isError     = false; 
                  state.isUserLogin = true;
                  state.userRoleId  = action.payload.role_id;
                  state.userId      = action.payload._id;
          },
          deleteProduct: (state,action) => {

                  state.isLoading   = false;
                  state.authData    = null;
                  state.isError     = false; 
                  state.isUserLogin = false;
                  state.userRoleId  = null;
                  state.userId      = null;
          },
          updateProduct: (state,action) => {

                  state.isLoading   = false;
                  state.authData    = null;
                  state.isError     = false; 
                  state.isUserLogin = false;
                  state.userRoleId  = null;
                  state.userId      = null;
          },
          allProduct: (state,action) => {

                  state.isLoading   = false;
                  state.authData    = null;
                  state.isError     = false; 
                  state.isUserLogin = false;
                  state.userRoleId  = null;
                  state.userId      = null;
          }
  }
})

export const { addProduct, deleteProduct, updateProduct, allProduct } = loginApiSlice.actions;
export default loginApiSlice.reducer