import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const isLoggedIn = localStorage.getItem('isLoggedIn');
  
    if (!isLoggedIn) {
      return <Navigate to="/admin/login" state={{ from: location }} replace />;
    }
  
    return children;
  };



export default ProtectedRoute;
