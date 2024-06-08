import { Navigate, useLocation } from 'react-router-dom';
import { getTopUpToken } from './handelAdminToken';

const ProtectedRoute = ({ children }: any) => {
  const location = useLocation();
  const token = getTopUpToken();
  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
  }

  return children;
};

export default ProtectedRoute;
