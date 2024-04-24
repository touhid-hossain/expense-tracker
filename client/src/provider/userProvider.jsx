import React, { createContext, useContext, useState, useMemo } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initial user state is null
  const [time, setTime] = useState("yearly");

  const handleTimeChange = (e) => {
    setTime(e);
  };

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const contextValue = {
    user,
    setUser: updateUser,
    handleTimeChange,
    time,
  };

  // const contextValue = useMemo(
  //   () => ({
  //     user,
  //     setUser: updateUser,
  //     handleTimeChange,
  //     time,
  //   }),
  //   [user]
  // );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};

export default UserProvider;
