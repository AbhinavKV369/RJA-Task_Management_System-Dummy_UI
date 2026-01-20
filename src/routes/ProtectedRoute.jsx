import React from 'react'
import { useAuth } from '../context/auth/useAuth'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({allowedRoles}) => {
    const {user} = useAuth();
    if(!user){
        return <Navigate to="/" />
    }
    if(!allowedRoles.includes(user.role)){
        return <Navigate to="/" />
    }
  return <Outlet />
}

export default ProtectedRoute