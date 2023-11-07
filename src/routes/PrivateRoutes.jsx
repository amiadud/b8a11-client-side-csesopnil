import React from 'react';
import useAuth from '../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({children}) => {

    const {user, loading} = useAuth()
    const location = useLocation()

    if(loading){
        return <span className="loading loading-spinner "></span>
    }

    else if (user) {
        return children;
    }


    return ( 
        toast.warning('Please login first!!'),
        <ToastContainer></ToastContainer>,
    <Navigate  to="/login"></Navigate>
    
    );
};

export default PrivateRoutes;