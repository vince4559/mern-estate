import React, { useState } from 'react';
import { currentEmail, currentUser } from '../auth/authSlice';
import {  useSelector } from 'react-redux';
import { useSendEmailMutation } from './contactApiSlice';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const Contact = ({listing}) => {                
    const [subject, setSubject] = useState(listing.name);
    const [message, setMessage] = useState('');

    const Email = useSelector(currentEmail);
    const User = useSelector(currentUser);
    const navigate = useNavigate();

    const [sendEmail, {isLoading}] = useSendEmailMutation();

    const handleSendMessage = async(e) => {
        e.preventDefault();
      
        try {
            await sendEmail({email: Email, subject, message}).unwrap();
            toast.success("Message sent");
            navigate("/listings")
        } catch (error) {
            console.log(error.message)
            toast.error('Message did not send')
        }
    };

  return (
    <section className='border-t mt-5'>
        <h2>Contact <span className='font-semibold italic'>{User}</span> for {listing.name}</h2>
        <form onSubmit={handleSendMessage}>

            <label htmlFor='subject'> Subject: <br/>
                <textarea type='text' name="subject" id="subject" cols="50"
                    value={subject} onChange={(e) => setSubject(e.target.value)} required
                />
           </label>
            
           <label htmlFor='message'> Message: <br/>
                <textarea name="message" id="message" cols="50" rows="3" placeholder={`Send ${User} a message`}
                    value={message} onChange={(e) => setMessage(e.target.value)} required
                />
           </label>
            <button className='btn btn-sec w-full' disabled={isLoading}>
                {isLoading? 'Sending' : "Send Message"}
           </button> 
        </form>
        <ToastContainer 
            autoClose={1000}
            draggable
            theme='dark'
        />
    </section>
  )
}

export default Contact