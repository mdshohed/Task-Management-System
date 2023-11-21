import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import UserContext from '../../context/UserContext';

function ProtectedUser({ children }) {
  const { signIn} = useContext(UserContext);

  if (signIn !== "user") {
    return <Navigate to="/login" replace />
  }
  return children;
}
export default ProtectedUser;

