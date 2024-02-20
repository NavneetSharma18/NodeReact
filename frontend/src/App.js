import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from         './components/Layout/Navbar';
import Footer from         './components/Layout/Footer';
import Signup from         './components/Dashboard/Signup';
import Login from          './components/Dashboard/Login';
import AddProduct from     './components/Dashboard/AddProduct';
import AllProduct from     './components/Dashboard/AllProducts';
import UpdateProduct from  './components/Dashboard/UpdateProduct';

import PrivateComponents from './components/PrivateComponents';

function App() {


  const auth = localStorage.getItem('user')

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

        </Routes>
        <Footer />
      </BrowserRouter>
        <ToastContainer />
    </div>
  );
}

export default App;
