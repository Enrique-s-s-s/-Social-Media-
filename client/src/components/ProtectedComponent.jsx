import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); 

  if (!token) {
    alert('you need to register or login')
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
