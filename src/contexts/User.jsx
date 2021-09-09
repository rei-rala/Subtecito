import React, { FC, useState } from "react";
import { UserContextState } from "../types/types";

const contextDefaultValues: UserContextState = {
  isUserLoggedIn: false,
  setIsUserLoggedIn: () => { }
};

export const User = React.createContext<UserContextState>(contextDefaultValues)

export const UserContext: FC = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<Boolean>(false)

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