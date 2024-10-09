import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit';
import  reducerLogin   from './redux/userApi';
import  reducerProduct from './redux/productApi';
import {thunk} from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import {persistReducer} from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';

const persistConfig = {
  key:'root',
  version:1,
  storage
}

const reducers = combineReducers({
   loginRes  :reducerLogin,
   cartItem  :reducerProduct
})

const persistedReducer = persistReducer(persistConfig,reducers);


export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})