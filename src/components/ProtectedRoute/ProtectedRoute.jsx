import { useContext } from 'react';
import {IsLoggedInContext} from '../../contexts/IsLoggedInContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children, anonymous = false}) {
  const { isLoggedIn } = useContext(IsLoggedInContext);

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/signin" />
  }

  return children
}