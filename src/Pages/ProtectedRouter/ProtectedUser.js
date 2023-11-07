import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedUser({ signIn, children }) {
  if (signIn !== "user") {
    window.localStorage.removeItem("role");
    return <Navigate to="/login" replace />
  }
  return children;
}
export default ProtectedUser;