import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { STORAGE_KEYS } from '../../constants/storage';

const PrivateRoute: React.FC = () => {
  const accessToken = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  const isAuthenticated = !!accessToken;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
