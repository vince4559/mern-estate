import React, { useState } from 'react';
import { useSignupMutation } from './authApiSlice';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const Sign_up = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate =  useNavigate();

    const [signup, {isLoading}] = useSignupMutation();

    const handleSignup = async(e) => {
        e.preventDefault();
        try {
            await signup({username, email, password}).unwrap();
            toast.success('Sign_up Successfull')
            setUsername('')
            setEmail('');
            setPassword('');
           navigate('/signin')
        } catch (err) {
            toast.error("Error occured during Sign_up")
            console.log(err.message)
        }
    }
  return (
    <section className='flex flex-col items-center'>
        {isLoading? <p>Loading ...</p> 
        :
        <form onSubmit={handleSignup}>
            <label htmlFor='Username'>Username: <br />
                 <input type='text' id='username' required placeholder='username' 
                    value={username} onChange={(e) => setUsername(e.target.value)}
                 />            
            </label> 
            <label htmlFor='email'>Email: <br />
                 <input type='email' id='email' required placeholder='email'
                    value={email} onChange={(e) => setEmail(e.target.value)}
                 />            
            </label> 
            <label htmlFor='password'>Password: <br />
                 <input type='password' id='password' required placeholder='password'
                    value={password} onChange={(e) => setPassword(e.target.value)} autoComplete='off'
                 />            
            </label> 
            
            <button className='btn btn-sec w-full'>
                Sign_Up
            </button>
            <p>Already have an account <Link to={'/signin'} className='text-blue-500'>Sign_in</Link></p>
        </form>
        }
         <ToastContainer 
            autoClose={1000}
            draggable
            theme='dark'
        />
    </section>
  )
}

export default Sign_up
