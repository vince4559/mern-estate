import React from 'react';
import {Outlet, useLocation, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import { currentToken } from './authSlice';


const RequiredAuth = () => {
    const token = useSelector(currentToken);
    // console.log(token);
    const location = useLocation();

  return (
    token 
    ? <Outlet />
    : <Navigate to={'/signin'} state={{from:location}} replace />
  )
}

export default RequiredAuth
