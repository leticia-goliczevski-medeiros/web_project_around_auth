import { useContext } from 'react';
import {IsLoggedInContext} from '../../contexts/IsLoggedInContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({children}) {
  const { isLoggedIn } = useContext(IsLoggedInContext);

  if (!isLoggedIn) {
    return <Navigate to="/signin" />
  }

  return children
}