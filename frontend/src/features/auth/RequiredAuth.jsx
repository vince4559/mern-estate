import React from 'react';
import {Outlet, useLocation, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import { currentEmail, roles } from './authSlice';


const RequiredAuth = ({allowedRoles}) => {
    const email = useSelector(currentEmail);
    const Roles = useSelector(roles)


    const location = useLocation();

  return (
    Roles?.find(role => allowedRoles?.includes(role))
    ? <Outlet />
    : email
    ? <Navigate to={'/unauthorized'} state={{from: location}} replace />
    : <Navigate  to={'/signin'} state={{from:location}} replace/>
  )
}

export default RequiredAuth
