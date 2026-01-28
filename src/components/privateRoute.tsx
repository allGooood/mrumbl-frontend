import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoute: React.FC = () => {
    const { isAuthenticated } = useAuth();
    // const { isAuthenticated, loading } = state;
  
    // if (loading) {
    //   return <div>Loading...</div>;
    // }
  
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
  };
  
  export default PrivateRoute;