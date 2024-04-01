import './App.css';
import logo                           from './logo.svg';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React,{useState,useEffect} from 'react'
import { ToastContainer, toast }      from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar            from  './components/Layout/Navbar';
import Footer            from  './components/Layout/Footer';
import Signup            from  './components/Signup';
import Login             from  './components/Login';

import Shop              from  './components/User/Shop';
import Checkout          from  './components/User/Checkout';



import AddProduct        from  './components/Admin/Product/AddProduct';
import AllProduct        from  './components/Admin/Product/AllProducts';
import UpdateProduct     from  './components/Admin/Product/UpdateProduct';
import PrivateComponents from  './components/PrivateComponents';

function App() {


  const auth       = localStorage.getItem('user')
  const [nodeapiurl,setNodeapiurl]  = useState("");
  
  useEffect(()=>{

      setNodeapiurl(process.env.REACT_APP_NODE_API_URL);
    })


  return (

    <div className="App">
     <BrowserRouter>
       <Navbar/>
       
        <Routes>
        
          <Route element={<PrivateComponents />} >
              <Route path="/" element={<AllProduct />} />
              <Route path="/add" element={<AddProduct />} />
              <Route path="/update/:id" element={<UpdateProduct />} />
              <Route path="/logout" element={<h1>Logout User</h1>} />
              
          </Route>

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/checkout" element={<Checkout />} />
        
          
        
        </Routes>
        <Footer />
      </BrowserRouter>
        <ToastContainer />
    </div>
  );
}

export default App;
