import React, { useContext, useRef } from 'react'
import InputField from '../components/input.component'
import {toast, Toaster} from 'react-hot-toast';
import axios from 'axios';
import { storeInSession } from '../common/session';
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';



const UserAuth = () => {

    const authForm = useRef();
    const navigate = useNavigate();
    const { userAuth: { access_token }, setUserAuth } = useContext(UserContext)
    console.log(access_token)
    const userAuthThroughServer = async (formData) => {
        try{
            const response = await axios.post('http://localhost:7000/signup',formData)
            storeInSession({"user": JSON.stringify(response.data)});
            setUserAuth(response.data)
            navigate('/');
            
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
        const {fullName, email, password} = formData;
        if(fullName.length < 3){
            return toast.error("Username Invalid")
        }
        if(!email){
            return toast.error("Email Required")
        }
        if(!password){
            return toast.error("Password Required")
        }

        userAuthThroughServer(formData);
    }
  return (
    <section className='h-cover flex items-center justify-center'> 
    <Toaster />
        <form ref={authForm} action="/" className="w-[80%] max-w-[400px]">
            <h1 className='text-center text-4xl mb-4 text-bold'>Register Here</h1>
        <InputField
            name = "fullName"
            type = "text"
            placeholder= "Full Name"
            img = "fi-rr-user"
        />
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
        >SignUp</button>
        </form>
    </section>
  )
}

export default UserAuth