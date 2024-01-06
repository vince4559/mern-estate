import React from 'react';
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth';
import { app } from './firebase';
import { useGoogleSignInMutation } from '../features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentails } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const GoogleAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [google, {isLoading}] = useGoogleSignInMutation();

    const handleGoogleSignIn = async() => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            // console.log(result)

            const data = {
                username: result.user.displayName.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: result.user.email
            };

            // console.log(data)

            const res = await google(data).unwrap();
            dispatch(setCredentails({...res}))
            navigate('/profile')
        } catch (error) {
            
        }
    };

  return (
    <button className='btn btn-prim my-4' type='button' onClick={handleGoogleSignIn}>
        Continue With Google
    </button>
  )
}

export default GoogleAuth