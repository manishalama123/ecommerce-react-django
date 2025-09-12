import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AdminRoute = () => {
    const location = useLocation();
    console.log("🚨 AdminRoute - Current path:", location.pathname);
    console.log("🚨 AdminRoute - Location state:", location.state);
    
    const {isAuthenticated, user} = useSelector((state)=> state.auth);
    console.log("🚨 AdminRoute - Auth state:", { isAuthenticated, user });

    if(!isAuthenticated){
        console.log("🚨 AdminRoute - Redirecting to login with state:", {from: location.pathname});
        return <Navigate to="/login" state={{from: location.pathname}} replace />
    }
    if(user?.role !== "admin"){
        return <Navigate to="/" replace />
    }
    
    return <Outlet/>
}

export default AdminRoute
