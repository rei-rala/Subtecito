import React, { useState } from "react";

export const User = React.createContext()

export const UserContext = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  return (
    <User.Provider
      value={{
        isUserLoggedIn,
        setIsUserLoggedIn
      }}
    >
      {children}
    </User.Provider>
  )
}