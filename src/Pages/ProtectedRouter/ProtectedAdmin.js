import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import UserContext from '../../context/UserContext';

function ProtectedAdmin({ children }) {
  const { signIn, userRole} = useContext(UserContext);

  if (signIn !== "admin") {
    return <Navigate to="/login" replace />
  }
  return children;
}
export default ProtectedAdmin;