import React, { useState } from 'react'
import { useSigninMutation } from './authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentails } from './authSlice';
import {useNavigate} from 'react-router-dom'


const Sign_in = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const dispatch =  useDispatch();
    const [ signIn, {isLoading}] = useSigninMutation();
    const handleSignIn =async (e) => {
        e.preventDefault()
        try {
            const userData =await signIn({email, password}).unwrap();
            const username = userData.user
            dispatch(setCredentails({...userData, email, username  }))
            setEmail('');
            setPassword('');
            navigate('/welcome')
            
        } catch (err) {
            console.log(err.message)
        }
    }

   
  return (
    <section className='flex flex-col items-center'>
        {isLoading? <p>Loading ...</p> : 
        <div>
            <h2 className='text-center my-4'>Sign in  here...</h2>
            <form onSubmit={handleSignIn} >
                <label htmlFor='email'> Email: <br/>
                    <input type='email' placeholder='Enter Your Email' id='email' value={email} 
                    onChange={e => setEmail(e.target.value)}  />
                </label> 
                <label htmlFor='password'> Password: <br/>
                    <input type='password' placeholder='Enter Your Email' id='password' autoComplete='off'
                    value={password} onChange={e => setPassword(e.target.value)}
                    />
                </label>

                <button className='btn btn-prim w-full'>
                    Sign in
                </button>
            </form>
        </div>
        }
    </section>
  )
}

export default Sign_in
