import React from 'react';
import {Outlet, useLocation, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import { currentEmail, Roles } from './authSlice';


const RequiredAuth = ({allowedRoles}) => {
    const email = useSelector(currentEmail);
    const roles = useSelector(Roles);
    const location = useLocation();

  return (
    roles?.find(role => allowedRoles?.includes(role))
    ? <Outlet />
    : email
    ? <Navigate to={'/unauthorized'} state={{from: location}} replace />
    : <Navigate  to={'login'} state={{from:location}} replace/>
  )
}

export default RequiredAuth
