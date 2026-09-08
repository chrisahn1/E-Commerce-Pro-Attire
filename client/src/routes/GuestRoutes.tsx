import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GuestRoute = () => {
  const { isAuth } = useAuth();
  return isAuth ? <Navigate to="/" replace /> : <Outlet />;
};

export default GuestRoute;
