import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<'GPO' | 'VENDOR'>;
}

export const ProtectedRoute = ({ children, allowedRoles = [] }: ProtectedRouteProps) => {
  const { isAuthenticated, user, checkAuth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      if (!isAuthenticated) {
        const isValid = await checkAuth();
        if (!isValid) {
          navigate('/login');
          return;
        }
      }

      if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
        if (user.role === 'GPO') {
          navigate('/dashboard');
        } else if (user.role === 'VENDOR') {
          navigate('/vendor/dashboard');
        } else {
          navigate('/login');
        }
      }
    };

    verifyAuth();
  }, [isAuthenticated, user, allowedRoles, navigate, checkAuth]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 