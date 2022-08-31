import { useApiContext } from '@/presentation/hooks';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export function PrivateRoute(): JSX.Element {
  const { getCurrentAccount } = useApiContext();
  const token = getCurrentAccount!()?.accessToken;

  if(!token) return <Navigate to="/signin" replace />;

  return <Outlet />;
}
