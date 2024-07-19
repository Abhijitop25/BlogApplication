import React, { useContext, useState } from 'react'
import logo from "../imgs/logo.png"
import { Link } from 'react-router-dom'
import { UserContext } from '../App';
const Navbar = () => {
    const [showSerchBar, setShowSearchBar] = useState(false);

    const { userAuth, userAuth: {access_token, profile_img} } = useContext(UserContext)
  return (
    <nav className="navbar bg-grey-200">
        
        <Link to="/" className='flex-none w-10'>
            <img src={logo} className='w-full'/>
        </Link>
        

        <div className="absolute bg-white w-full left-0 top-full mt-0 border-b border-grey md:relative md:top-2 px-4 
        md:show" >
            <input 
                type='text'
                placeholder='search'
                className='w-full md:w-full bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full'
            />
            <i className="fi fi-br-search absolute right-[5%] mt-4 text-2xl text-gray-300 md:absolute md:right-[10%] m-2"></i>
        </div>
        <i className="fi fi-br-search absolute right-[30%] mt-4 text-2xl text-gray-300 md:hide m-2"></i>
        <i className="btn-light hide md:static md:show">Add</i>
        {
            access_token ?
            <>
            <Link to="/dashboard/notification">
                <button className='w-12 h-12 rounded-full bg-grey absolute right-[5%] top-[20%] md:right-[7%] hover:bg-black/10'>
                <i class="fi fi-rr-bell text-2xl block"></i>
                </button>
            </Link>
            <Link to="/dashboard/notification">
                <button className='w-12 h-12 rounded-full bg-grey absolute right-[17%] top-[20%] md:right-[2%] hover:bg-black/10'>
                <img src={profile_img} className='w-full h-full object-cover rounded-full'/>
                </button>
            </Link>
            
            </>
            :
            <>
            <Link to="/signin" className=" btn-dark absolute right-[5%] md:static">SingIn</Link>
            <Link to="/signup" className="btn-light hide md:static md:show">Register</Link>
            </>
        }

        
        

    </nav>
  )
}

export default Navbar