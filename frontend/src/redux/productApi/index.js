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
          

    }catch (error) {

            toast.error('Error during login:'+error, {
              position: toast.POSITION.TOP_RIGHT,
            });
    }


}


/*-------------------------------------------------
| Increase Product Qty
---------------------------------------------------*/

export const qtyIncrease = (product) => async (dispatch) => {

    try {   
          
          dispatch(incProductQty(product));
          

    }catch (error) {

            toast.error('Error in increment product qty:'+error, {
              position: toast.POSITION.TOP_RIGHT,
            });
    }


}

/*-------------------------------------------------
| Decrease Product Qty
---------------------------------------------------*/

export const qtyDecrease = (product) => async (dispatch) => {

    try {   
          
          dispatch(decProductQty(product));
          

    }catch (error) {

            toast.error('Error in decrement product qty:'+error, {
              position: toast.POSITION.TOP_RIGHT,
            });
    }


}


/*-------------------------------------------------
| Remove Product From Cart 
---------------------------------------------------*/

export const removeProduct = (product) => async (dispatch) => {

  try {   
        
        dispatch(removeProductCart(product));
        

  }catch (error) {

          toast.error('Error in removing product:'+error, {
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
                    toast.success(state.newItem.product_title+' is added to your cart successfully!', {
                      position: toast.POSITION.TOP_RIGHT,
                    });
                  }
                  state.subTotal   = state.cartItems.reduce((acc, item) => acc + item.product_price*item.qty, 0);
                  state.totalPrice = state.subTotal*1+state.shippingCost*1    
              
          },
          incProductQty: (state, action) => {

                  state.newItem  = action.payload;
                  let index =  state.cartItems.findIndex(product => product._id === state.newItem._id);
                  if (index !== -1) {
                     state.cartItems[index].qty += 1;
                     state.subTotal   = state.cartItems.reduce((acc, item) => acc + item.product_price*item.qty, 0);
                     state.totalPrice = state.subTotal*1+state.shippingCost*1  

                     toast.info('Product qty increased', {
                      position: toast.POSITION.TOP_RIGHT,
                    });
                      
                  } 
            
          },
          decProductQty: (state, action) => {

            state.newItem  = action.payload;

            const index =  state.cartItems.findIndex(product => product._id === state.newItem._id);

            if(state.cartItems[index].qty > 1){

                if (index !== -1) {

                    state.cartItems[index].qty -= 1;
                    state.subTotal   = state.cartItems.reduce((acc, item) => acc + item.product_price*item.qty, 0);
                    state.totalPrice = state.subTotal*1+state.shippingCost*1  
                    
                } 
                toast.info('Product qty decreased', {
                  position: toast.POSITION.TOP_RIGHT,
                });

            }else if(state.cartItems[index].qty === 1){

              const newCartItems = state.cartItems.filter(item => item._id !== state.newItem._id)
              state.cartItems    = newCartItems
              state.subTotal   = state.cartItems.reduce((acc, item) => acc + item.product_price*item.qty, 0);
              state.totalPrice = state.subTotal*1+state.shippingCost*1  
              
            }
            
            
        
          },
          removeProductCart: (state, action) => {

            state.newItem      = action.payload;
            const newCartItems = state.cartItems.filter(item => item._id !== state.newItem._id)
            state.cartItems    = newCartItems;
            state.subTotal   = state.cartItems.reduce((acc, item) => acc + item.product_price*item.qty, 0);
            state.totalPrice = state.subTotal*1+state.shippingCost*1  
            

            toast.info('Product removed form cart', {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
  }
})

export const { addToCart,incProductQty,decProductQty,removeProductCart } = productApiSlice.actions;
export default productApiSlice.reducer