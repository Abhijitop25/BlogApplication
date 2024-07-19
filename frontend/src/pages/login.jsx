import React, { useContext, useRef } from 'react'
import InputField from '../components/input.component'
import {toast, Toaster} from 'react-hot-toast';
import axios from 'axios';
import { storeInSession } from '../common/session.jsx';
import { UserContext } from '../App.jsx';
import { Navigate } from 'react-router-dom';
import Navbar from '../components/navbar.component.jsx';



const SignIn = () => {

    const authForm = useRef();
    const { userAuth: { access_token}, setUserAuth } = useContext(UserContext)
    console.log(access_token)
    const userAuthThroughServer = async (formData) => {
        try{
            const response = await axios.post('http://localhost:7000/signin',formData)
            storeInSession("user",JSON.stringify(response.data));
            setUserAuth(response.data)
            
        } catch(err){
            return toast.error(err.message);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const form = new FormData(authForm.current);

        const formData = {};

        for(let [key, value] of form.entries()){
            formData[key] = value;
        }
        const {email, password} = formData;
        
        if(!email){
            return toast.error("Email Required")
        }
        if(!password){
            return toast.error("Password Required")
        }

        userAuthThroughServer(formData);
    }
  return (
    access_token ?
    <Navigate to="" />
    :
    <div>
    <Navbar/>
    <section className='h-cover flex items-center justify-center'> 
    <Toaster />
    <form ref={authForm} action="/" className="w-[80%] max-w-[400px]">
    <h1 className='text-center text-4xl mb-4 text-bold'>Welcome Back</h1>
    
    <InputField
    name = "email"
    type = "email"
    placeholder= "Email"
    img = "fi-rr-envelope"
    />
    <InputField
            name = "password"
            type = "password"
            placeholder= "Password"
            img = "fi-rs-key"
            />
    
        <button 
            type='submit' 
            className="btn-dark center"
            onClick={handleSubmit}
        >SignIn</button>
        </form>
    </section>
    </div>
)
}

export default SignIn