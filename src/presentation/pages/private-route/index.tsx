import { useApiContext } from '@/presentation/hooks';
import React from 'react';
import { Navigate, RouteProps } from 'react-router-dom';

export function PrivateRoute({ children }: RouteProps) {
  const { getCurrentAccount } = useApiContext();

  return getCurrentAccount!()?.accessToken
  ? children as JSX.Element
  : <Navigate to="/signin" replace />;
}
