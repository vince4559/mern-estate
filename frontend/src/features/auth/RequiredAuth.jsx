import React from 'react';
import {Outlet, useLocation, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import { currentToken, currentEmail } from './authSlice';


const RequiredAuth = () => {
    // const token = useSelector(currentToken);
    const email = useSelector(currentEmail);
    const location = useLocation();

  return (
    email 
    ? <Outlet />
    : <Navigate to={'/signin'} state={{from:location}} replace />
  )
}

export default RequiredAuth
