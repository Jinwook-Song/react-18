import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function PrivateRoute({
  children,
  adminOnly = false,
}: PrivateRouteProps) {
  const { initialized, user } = useAuthContext();

  if (!initialized) return children;

  if (!user || (adminOnly && !user.isAdmin))
    return <Navigate to={'/'} replace />;

  return children;
}
