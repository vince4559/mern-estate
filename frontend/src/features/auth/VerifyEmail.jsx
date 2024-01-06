import React from 'react'
import {useVerifyEmailQuery } from './authApiSlice'
import { Link, useParams } from 'react-router-dom'

const VerifyEmail = () => {
    const {id, token} = useParams();
    const {data} = useVerifyEmailQuery({id, token});
    console.log(data)
  return (
    <div className='bg-gray-300 h-screen'>
        {data? 
        (<div>
            <h3>Email verified successfully</h3>
            <Link to={'/signin'}>Login</Link>
        </div>) 
        : 
        (<div>
            <p>Invalid link</p>
        </div>)}
    </div>
  )
}

export default VerifyEmail