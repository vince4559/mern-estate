import { useSignupMutation } from './authApiSlice';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form'
import {string, object} from 'yup';
import { useState } from 'react';


const Sign_up = () => {
    const [msg, setMsg] = useState('');
    const navigate =  useNavigate();

    const [signup, {isLoading}] = useSignupMutation();

    // yup validator
    const userValidatorSchema = object().shape({
        username: string().required('username is required'),
        email: string().email('input a valid email').required('email is required'),
        password: string().min(6, 'password not strong enough').required(),
    });

    // connecting yup with react-hook-form
   const {register, reset, formState:{errors}, handleSubmit} = useForm({
    resolver: yupResolver(userValidatorSchema),
    reValidateMode:'onChange',
    criteriaMode: 'all',
    mode: 'all'
   })


    const handleSignup = async(data) => {
        try {
           const res = await signup(data).unwrap();
           setMsg(res.message)
            toast.success(res.message);
            // reset();
            // navigate('/signin');
        } catch (err) {
            toast.error(`${err.data.message}`)

        }
    }
 
   
  return (
    <section className='flexContainer'>
         <h2 className='text-center my-4 capitalize'> welcome to noble's estate</h2>
        <h3 className='text-center my-4 capitalize text-blue-800'>Sign up here...</h3>
        {isLoading? <p>Loading ...</p> 
        :
        <form onSubmit={handleSubmit(handleSignup)}>
            <label htmlFor='Username'>Username: <br />
                 <input type='text' id='username' required placeholder='username' 
                   {...register('username')}
                 />            
                 {errors.username?.message && <p className='errMsg'>{errors.username?.message}</p>}
            </label> 
            <label htmlFor='email'>Email: <br />
                 <input type='email' id='email' required placeholder='email'
                    {...register("email")}
                 />            
                 {errors.email?.message && <p className='errMsg'>{errors.email?.message}</p>}
            </label> 
            <label htmlFor='password'>Password: <br />
                 <input type='password' id='password' required placeholder='password'
                  autoComplete='off' {...register("password")}
                 />            
                 {errors.password?.message && <p className='errMsg'>{errors.password?.message}</p>}
            </label> 
            {msg && <div className='bg-red-900 text-white p-2 rounded-lg my-4'>{msg}</div>}
            <button className='btn btn-sec w-full'>
                Sign_Up
            </button>
            <p>Already have an account <Link to={'/signin'} className='text-blue-500'>Sign_in</Link></p>
        </form>
        }
         <ToastContainer 
            autoClose={3000}
            draggable
            theme='dark'
        />
    </section>
  )
}

export default Sign_up
