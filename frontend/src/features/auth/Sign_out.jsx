import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useSignoutMutation } from './authApiSlice';
import { logOut } from './authSlice';
import { useDispatch } from 'react-redux';

const Sign_out = () => {
    const Sign_out = useSignoutMutation();
    // console.log(Sign_out);

    const dispatch = useDispatch();
    const navigate = useDispatch()

    const handleLogOut = () => {
       try {
        Sign_out
        toast.success('You are Logged Out')
        dispatch(logOut())
        navigate('/')
       } catch (error) { 
        console.log(error)
        toast.error("error occured")
       }
    }

  return (
    <section>
        <button onClick={handleLogOut}>
            Sign_out
        </button>
        <ToastContainer 
            autoClose={1000}
            draggable
            theme='dark'
        />
    </section>
  )
}

export default Sign_out