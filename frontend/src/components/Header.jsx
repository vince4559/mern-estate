import React, { useState } from 'react'
import logo from '/images/logo.png'
import  { NavLink, useNavigate}  from "react-router-dom";
import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { ToastContainer, toast } from 'react-toastify';
import {currentUser} from '../features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useSignoutMutation } from '../features/auth/authApiSlice';
import { logOut } from '../features/auth/authSlice';

const Header = () => {
    const [show, setShow] = useState(false);
    // console.log(show)

    const onToggle = () => {
        setShow(!show)
    };
    const dispatch = useDispatch();
    const USER = useSelector(currentUser);
    // console.log(USER)
    const [signOut,{isSuccess}] = useSignoutMutation();
    // console.log(isSuccess)
    const navigate = useNavigate();


    const handleLogOut = async () => {
        try {
            await signOut().unwrap();
            if(isSuccess === false) {
                dispatch(logOut())
                toast.success('You are Logged Out') 
                navigate('/') 
            }
        } catch (err) {
            console.log(err)
            toast.error('Error occured')
        }
    }

  return (
   <header className='w-full p-1 bg-black text-white'>
        <nav className=' flex justify-between px-3 items-center'>
            <div className='z-50 '>
                <NavLink to={'/'}>
                     <img alt='logo' src={logo} className='w-14' />
                </NavLink>
            </div>
            <div >
                <input type='search' className='p-1 rounded-lg border border-white-400 text-black'/>
            </div>
           <div className='flex'>
           <div className='md:flex hidden gap-5 '>
                <NavLink to={'/'} style={({isActive})=> isActive? {color:'yellowgreen'} :{color:'white'} }>Home</NavLink>
                <NavLink to={'/profile'} style={({isActive})=> isActive? {color:'yellowgreen'} :{color:'white'} }>Profile</NavLink>
               {USER ? 
               <button onClick={handleLogOut}>Sign_Out</button> 
               :  <NavLink to={'/signin'} style={({isActive})=> isActive? {color:'yellowgreen'} :{color:'white'} }>Sign in</NavLink>
                }
            </div>
                <div onClick={onToggle} className='flex md:hidden'>
                   {show?  <AiOutlineClose size={25}/> :<BiMenuAltRight size={30}/> }
                </div>
           </div>

           {/* mobile view */}

           <div className={`md:hidden absolute w-full h-[90%] top-14 bg-gray-700 pl-5 py-24 duration-500 ${show? 'left-0': 'hidden'}  font-semibold`}>
               <div className='flex flex-col gap-5'>
               <NavLink onClick={onToggle}  to={'/'} style={({isActive})=> isActive? {color:'yellowgreen'} :{color:'white'} }>Home</NavLink>
                <NavLink onClick={onToggle} to={'/profile'} style={({isActive})=> isActive? {color:'yellowgreen'} :{color:'white'} }>Profile</NavLink>
                {USER? 
               <button onClick={handleLogOut}>Sign_Out</button> 
               :  <NavLink onClick={onToggle} to={'/signin'} style={({isActive})=> isActive? {color:'yellowgreen'} :{color:'white'} }>Sign in</NavLink>
                }
               </div>
               <div className='mt-10'>
                <h2>{USER}</h2>
               </div>
            </div>
        </nav>
        <ToastContainer 
            autoClose={1000}
            draggable
            theme='dark'
        />
   </header>
  )
}

export default Header
