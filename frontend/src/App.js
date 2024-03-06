import './App.css';
import logo                           from './logo.svg';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import React,{useState,useEffect} from 'react'
import { ToastContainer, toast }      from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar            from  './components/Layout/Navbar';
import Footer            from  './components/Layout/Footer';
import Signup            from  './components/Dashboard/Signup';
import Login             from  './components/Dashboard/Login';
import Shop              from  './components/Product/User/Shop';
import AddProduct        from  './components/Product/Admin/AddProduct';
import AllProduct        from  './components/Product/Admin/AllProducts';
import UpdateProduct     from  './components/Product/Admin/UpdateProduct';
import PrivateComponents from  './components/PrivateComponents';
import ApiBaseUrlContext from  './components/ApiBaseUrlContext';

function App() {


  const auth       = localStorage.getItem('user')
  const [nodeapiurl,setNodeapiurl]  = useState("");
  
  useEffect(()=>{

      setNodeapiurl(process.env.REACT_APP_NODE_API_URL);
    })


  return (

    <div className="App">
    <ApiBaseUrlContext.Provider value={nodeapiurl}>
    
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
        
        </Routes>
        <Footer />
      </BrowserRouter>
      </ApiBaseUrlContext.Provider>
        <ToastContainer />
    </div>
  );
}

export default App;
