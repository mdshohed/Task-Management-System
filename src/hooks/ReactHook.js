

import React, { createContext, useEffect, useState } from 'react';

export const UserContext = React.createContext();

export const UserProvider = ({ children }) => {
  const [signedIn, setSignedIn] = useState(null);
  let signIn = localStorage.getItem("role");
  

  

  return (
    <UserContext.Provider value={[signIn, signedIn, setSignedIn]}>
      {children}
    </UserContext.Provider>
  )
};