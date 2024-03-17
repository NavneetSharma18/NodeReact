import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
axios.defaults.withCredentials = true

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

const initialState = {

  cartItems   : [],
  newItem     : null,
  totalPrice  : null,
  subTotal    : null,
  shippingCost: 4

}



/*-------------------------------------------------
| Create Redux Thunk For Api Call ASYNC
---------------------------------------------------*/

export const addProductToCart = (product) => async (dispatch) => {

    try {   
          
          dispatch(addToCart(product));
          toast.success(product.product_title+' is added to your cart successfully!', {
              position: toast.POSITION.TOP_RIGHT,
            });

    }catch (error) {

            toast.error('Error during login:'+error, {
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

          addToCart: (state, action) => {

                  state.newItem       = action.payload;
                  const isItemPresent = state.cartItems.some(item => item._id === state.newItem._id && item.product_price === state.newItem.product_price);
                  if(!isItemPresent){
                    state.cartItems.push(state.newItem);
                  }
                  state.subTotal   = state.cartItems.reduce((acc, item) => acc + item.product_price*1, 0);
                  state.totalPrice = state.subTotal*1+state.shippingCost*1


                  
              
          }
  }
})

export const { addToCart } = productApiSlice.actions;
export default productApiSlice.reducer