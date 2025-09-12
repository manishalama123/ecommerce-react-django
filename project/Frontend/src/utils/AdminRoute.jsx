import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AdminLayout from '../layout/AdminLayout';

const AdminRoute = () => {
    const location = useLocation();
    const {isAuthenticated, user} = useSelector((state)=> state.auth);
    if(!isAuthenticated){
        
        return <Navigate to="/login" state={{from: location.pathname}} replace />
    }
    if(user?.role !== "admin"){
        return <Navigate to="/" replace />
    }
    
    return (<>
        <AdminLayout/>
    </>)
}

export default AdminRoute
