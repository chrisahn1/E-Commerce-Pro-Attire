import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import { useState } from 'react';

const ProtectRoute = () => {
  // const { isAuth, accessToken } = useAuth();

  // const location = useLocation();

  // if (!isAuth) {
  //   return (
  //     <div>
  //       <h2 style={{ color: 'black' }}>403 Unauthorized</h2>
  //     </div>
  //   );
  // }

  // if (accessToken) {
  //   return <Outlet />;
  // } else {
  //   return <Navigate to="/" state={{ from: location }} replace />;
  // }

  const { isAuth, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>; // or a spinner component
  }

  if (!isAuth) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectRoute;
