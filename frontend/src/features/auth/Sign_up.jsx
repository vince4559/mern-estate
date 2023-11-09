import React, { useState } from 'react';
import { useSignupMutation } from './authApiSlice';
import { useNavigate } from 'react-router-dom';


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
            setUsername('')
            setEmail('');
            setPassword('');
           navigate('/signin')
        } catch (err) {
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
        </form>
        }
    </section>
  )
}

export default Sign_up