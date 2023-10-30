import React, { useState } from 'react'
import logo from '/images/logo.png'
import  {Link, NavLink}  from "react-router-dom";
import { BiMenuAltRight } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

const Header = () => {
    const [show, setShow] = useState(false);
    // console.log(show)

    const onToggle = () => {
        setShow(!show)
    };

  return (
   <header className='w-full p-1 bg-black text-white'>
        <nav className=' flex justify-between px-3 items-center'>
            <div className='z-50 '>
                <img alt='logo' src={logo} className='w-14' />
            </div>
            <div>
                <input type='search' className='p-1 rounded-lg border border-blue-400 text-black' />
            </div>
           <div className='flex'>
           <div className='md:flex hidden gap-5 '>
                <NavLink to={'/'} style={({isActive})=> isActive? {color:'yellowgreen'} :{color:'blue'} }>Home</NavLink>
                <NavLink to={'/profile'} style={({isActive})=> isActive? {color:'yellowgreen'} :{color:'blue'} }>Profile</NavLink>
                <NavLink to={'/signin'} style={({isActive})=> isActive? {color:'yellowgreen'} :{color:'blue'} }>Sign in</NavLink>
            </div>
                <div onClick={onToggle} className='flex md:hidden'>
                   {show?  <AiOutlineClose size={25}/> :<BiMenuAltRight size={30}/> }
                </div>
           </div>

           {/* mobile view */}

           <div className={`md:hidden absolute w-full h-[90%] top-14 bg-gray-700 pl-5 py-24 duration-500 ${show? 'left-0': 'hidden'}  font-semibold`}>
               <div className='flex flex-col gap-5'>
               <NavLink onClick={onToggle}  to={'/'} style={({isActive})=> isActive? {color:'yellowgreen'} :{color:'blue'} }>Home</NavLink>
                <NavLink onClick={onToggle} to={'/profile'} style={({isActive})=> isActive? {color:'yellowgreen'} :{color:'blue'} }>Profile</NavLink>
                <NavLink onClick={onToggle} to={'/signin'} style={({isActive})=> isActive? {color:'yellowgreen'} :{color:'blue'} }>Sign in</NavLink>
               </div>
               <div className='mt-10'>
                <h2>User details</h2>
               </div>
            </div>
        </nav>
   </header>
  )
}

export default Header
