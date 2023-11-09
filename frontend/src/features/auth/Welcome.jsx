import React from 'react';
import { currentEmail, currentUser } from './authSlice';
import { useSelector } from 'react-redux';


const Welcome = () => {
    const email = useSelector(currentEmail);
    const user = useSelector(currentUser);
    
    const welcome = email? `Welcome ${user}` : 'Welcome annonymous';
  return (
    <section>
        <h2>{welcome}</h2>
    </section>
  )
}

export default Welcome
