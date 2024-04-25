import React, { createContext, useContext, useState, useMemo } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initial user state is null

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const contextValue = useMemo(
    () => ({
      user,
      setUser: updateUser,
    }),
    [user]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

export default UserProvider;
