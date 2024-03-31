import React, { useState, useEffect } from 'react';
import { Link, json, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from 'react-redux'

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

import { checkLogout } from '../../redux/userApi/';

import { incProductQty, decProductQty, removeProductCart } from '../../redux/productApi/';

axios.defaults.withCredentials = true

const stripePromise = loadStripe("pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3");




const Checkout = () => {


    // Redux Params
    const auth = useSelector((state) => state.loginRes.isUserLogin);
    const userData = useSelector((state) => state.loginRes.authData);
    const cartItems = useSelector((state) => state.cartItem.cartItems);
    const total = useSelector((state) => state.cartItem.totalPrice);
    const subTotal = useSelector((state) => state.cartItem.subTotal);
    const shippingCost = useSelector((state) => state.cartItem.shippingCost);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

    //Place order Params

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [zip, setZip] = useState("");
    const [country, setCountry] = useState("");
    const [showPayment, setshowPayment] = useState("");
    const [error, setError] = useState(false);

    // set client secrate 
    const [clientSecret, setClientSecret] = useState("");
    
    const appearance = {
        theme: 'stripe',
      };
      const options = {
        clientSecret,
        appearance,
      };

    const placeOrder = async () => {

        if (!name || !email || !address || !city || !state || !zip || !country) {

            setError(true);

            if (error && !name) {

                toast.error('Please enter your name', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                return false;
            }
            if (error && !email) {

                toast.error('Please enter your email', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                return false;
            }
            if (error && !address) {

                toast.error('Please enter your address', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                return false;
            }

            if (error && !city) {

                toast.error('Please enter your city', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                return false;
            }

            if (error && !state) {

                toast.error('Please enter your state', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                return false;
            }

            if (error && !zip) {

                toast.error('Please enter your zip', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                return false;
            }

            if (error && !country) {

                toast.error('Please enter your country', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                return false;
            }

            return false;

        }

        /*---------------------------------
        | Send data to Node Js Api
        -----------------------------------*/

        axios(API_BASE_URL + '/payment/create-pi', {
            method: "post",
            data: { email, total },
            withCredentials: true
        }).then(function (res) {

            const result = res.data;
            if (result.status == true) {

                const pIntent = result.pi;

                setClientSecret(pIntent.client_secret);
                setshowPayment(true);
                localStorage.setItem('payment_intent', pIntent.client_secret);

                toast.success(result.msg, {
                    position: toast.POSITION.TOP_RIGHT,
                });

            } else {
                toast.error(result.msg, {
                    position: toast.POSITION.TOP_RIGHT,
                });
                return false;
            }
        }).catch(error => {

            toast.error('Error fetching data: ' + error, {
                position: toast.POSITION.TOP_RIGHT,
            });
            return false;

        });




    }

    return (

        <div className="register_div">

            <div className="h-screen grid grid-cols-3">
                <div className="lg:col-span-2 col-span-3 space-y-8 px-12">
                    <div className="mt-8 p-4  flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
                        <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
                            <div className="text-yellow-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 sm:w-5 h-6 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="text-sm font-medium ml-3">Checkout</div>
                        </div>
                        <div className="text-sm tracking-wide text-white-500 mt-4 sm:mt-0 sm:ml-4">Complete your shipping and payment details below.</div>
                        <div className="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-white-400 hover:text-white-800 cursor-pointer">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </div>
                    </div>
                    <div className="rounded-md">
                        <form id="payment-form" method="POST" >
                            <section>
                                <h2 className="uppercase tracking-wide text-lg font-semibold text-white-700 my-2">Shipping & Billing Information</h2>
                                <fieldset className="mb-3 bg-white shadow-lg rounded text-white-600">
                                    <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                        <span className="text-right px-2">Name</span>
                                        <input name="name" className="focus:outline-none px-3" placeholder="Try Odinsson" required="" onChange={(e) => { setName(e.target.value) }} />
                                    </label>
                                    <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                        <span className="text-right px-2">Email</span>
                                        <input name="email" type="email" className="focus:outline-none px-3" placeholder="try@example.com" required="" onChange={(e) => { setEmail(e.target.value) }} />
                                    </label>
                                    <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                        <span className="text-right px-2">Address</span>
                                        <input name="address" className="focus:outline-none px-3" placeholder="10 Street XYZ 654" onChange={(e) => { setAddress(e.target.value) }} />
                                    </label>
                                    <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                        <span className="text-right px-2">City</span>
                                        <input name="city" className="focus:outline-none px-3" placeholder="San Francisco" onChange={(e) => { setCity(e.target.value) }} />
                                    </label>
                                    <label className="inline-flex w-2/4 border-gray-200 py-3">
                                        <span className="text-right px-2">State</span>
                                        <input name="state" className="focus:outline-none px-3" placeholder="CA" onChange={(e) => { setState(e.target.value) }} />
                                    </label>
                                    <label className="xl:w-1/4 xl:inline-flex py-3 items-center flex xl:border-none border-t border-gray-200 py-3">
                                        <span className="text-right px-2 xl:px-0 xl:text-none">ZIP</span>
                                        <input name="postal_code" className="focus:outline-none px-3" placeholder="98603" onChange={(e) => { setZip(e.target.value) }} />
                                    </label>
                                    <label className="flex border-t border-gray-200 h-12 py-3 items-center select relative">
                                        <span className="text-right px-2">Country</span>
                                        <div id="country" className="focus:outline-none px-3 w-full flex items-center">
                                            <select name="country" className="border-none bg-transparent flex-1 cursor-pointer appearance-none focus:outline-none" onChange={(e) => { setCountry(e.target.value) }}>
                                                <option value="AU">Australia</option>
                                                <option value="BE">Belgium</option>
                                                <option value="BR">Brazil</option>
                                                <option value="CA">Canada</option>
                                                <option value="CN">China</option>
                                                <option value="DK">Denmark</option>
                                                <option value="FI">Finland</option>
                                                <option value="FR">France</option>
                                                <option value="DE">Germany</option>
                                                <option value="HK">Hong Kong</option>
                                                <option value="IE">Ireland</option>
                                                <option value="IT">Italy</option>
                                                <option value="JP">Japan</option>
                                                <option value="LU">Luxembourg</option>
                                                <option value="MX">Mexico</option>
                                                <option value="NL">Netherlands</option>
                                                <option value="PL">Poland</option>
                                                <option value="PT">Portugal</option>
                                                <option value="SG">Singapore</option>
                                                <option value="ES">Spain</option>
                                                <option value="TN">Tunisia</option>
                                                <option value="GB">United Kingdom</option>
                                                <option value="US" >United States</option>
                                            </select>
                                        </div>
                                    </label>
                                </fieldset>
                            </section>
                        </form>
                    </div>
                    {
                        (showPayment == true) ?
                            <>
                                <div className="rounded-md">
                                    <section><h2 className="uppercase tracking-wide text-lg font-semibold text-white-700 my-2">Payment Information</h2>
                                        
                                    </section>
                                </div>
                                {clientSecret && (
                                    <Elements options={options} stripe={stripePromise}>
                                        <CheckoutForm />
                                    </Elements>
                                )}
                                
                            </>


                            :
                            <>
                                <button className="submit-button px-4 py-3 rounded-full bg-pink-400 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors" onClick={placeOrder}>
                                    Proceed To Payment
                                </button>
                            </>


                    }


                </div>
                <div className="col-span-1 bg-white lg:block hidden">
                    <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">Order Summary</h1>
                    <ul className="py-6 border-b space-y-6 px-8">
                        {

                            cartItems.length > 0 ? cartItems.map((item, index) =>

                                <li className="grid grid-cols-6 gap-2 border-b-1">
                                    <div className="col-span-1 self-center">
                                        <img src={API_BASE_URL + item.product_image} alt="Product" className="rounded w-full" />
                                    </div>
                                    <div className="flex flex-col col-span-3 pt-2">
                                        <span className="text-gray-600 text-md font-semi-bold">{item.product_title}</span>

                                    </div>
                                    <div className="col-span-2 pt-3">
                                        <div className="flex items-center space-x-2 text-sm justify-between">
                                            <span className="text-gray-400">{item.qty} x ₹{item.product_price}</span>
                                            <span className="text-pink-400 font-semibold inline-block">₹{item.product_price}</span>
                                        </div>
                                    </div>
                                </li>
                            )
                                : 'No item in cart'
                        }
                    </ul>
                    <div className="px-8 border-b">
                        <div className="flex justify-between py-4 text-gray-600">
                            <span>Subtotal</span>
                            <span className="font-semibold text-pink-500">₹{subTotal}</span>
                        </div>
                        <div className="flex justify-between py-4 text-gray-600">
                            <span>Shipping</span>
                            <span className="font-semibold text-pink-500">₹{shippingCost}</span>
                        </div>
                    </div>
                    <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
                        <span>Total</span>
                        <span>₹{total}</span>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default Checkout
