
import React, { useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import MainLayout from '@/components/layout/Layout';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/login', { replace: true });
    } else if (!loading && isAuthenticated && user && allowedRoles) {
      if (!allowedRoles.includes(user.role)) {
        navigate('/', { replace: true });
      }
    }
  }, [loading, isAuthenticated, user, navigate, allowedRoles]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return isAuthenticated ? (
    <MainLayout>
      <Outlet />
    </MainLayout>
  ) : null;
};

export default ProtectedRoute;
