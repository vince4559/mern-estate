import React, { useEffect, useRef, useState } from 'react'
import { useSigninMutation } from './authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentails } from './authSlice';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


const Sign_in = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errmsg, setErrmsg] = useState('');
    const location = useLocation();

    const from = location.state?.from?.pathname || "/welcome"

    const errRef = useRef();
    const userRef = useRef();

    useEffect(() => {
        errRef.current?.focus();
    },[]);

    useEffect(() => {
        setErrmsg('')
    },[email, password]);

    const navigate = useNavigate();

    const dispatch =  useDispatch();
    const [ signIn, {isLoading}] = useSigninMutation();

    const handleSignIn =async (e) => {
        e.preventDefault()
        try {
            const userData =await signIn({email, password}).unwrap();
            const username = userData.user
            // console.log(userData)
            dispatch(setCredentails({...userData, email, username  }))
            toast.success('Sign_in Successfull')
            setEmail('');
            setPassword('');
            navigate(from, {replace: true})
            
        } catch (err) {
            if(!err.originalStatus){
                setErrmsg('No Server Response');
            }else if(err.originalStatus === 400){
                setErrmsg('Missing credentails');
            }else if(err.originalStatus === 401){
                setErrmsg('Unauthorsed');
            }else{
                setErrmsg('Sign_in failed');
            }
            errRef.current?.focus();
            toast.error('sign_in failed. try again...')
        }
    }

   
  return (
    <section className='flex flex-col items-center'>
        <p className='text-red-400'>{errmsg}</p>
        {isLoading? <p>Loading ...</p> : 
        <div>
            <h2 className='text-center my-4'>Sign in  here...</h2>
            <form onSubmit={handleSignIn} >
                <label htmlFor='email'> Email: <br/>
                    <input type='email' placeholder='Enter Your Email' id='email' value={email} 
                    onChange={e => setEmail(e.target.value)} required ref={userRef} 
                    />
                </label> 
                <label htmlFor='password'> Password: <br/>
                    <input type='password' placeholder='Enter Your Email' id='password' autoComplete='off'
                    value={password} onChange={e => setPassword(e.target.value)} required ref={userRef}
                    />
                </label>

                <button className='btn btn-prim w-full'>
                    Sign in
                </button>
                <p>Don't have an account? <Link className='text-blue-600' to={'/signup'}>Sign_Up</Link></p>
            </form>
        </div>
        }
        <ToastContainer 
            autoClose={1000}
            draggable
            theme='dark'
        />
</section>
  )
}

export default Sign_in
