import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null); // Initial user state is null

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const setToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
      setToken_(newToken);
    } else {
      localStorage.removeItem("token");
      setToken_(newToken);
    }
  };

  // useLayoutEffect(() => {
  //   if (token) {
  //     const decodedToken = jwtDecode(token);
  //     const expirationTime = decodedToken.exp * 1000; // Convert In Milliseconds
  //     const now = Date.now();
  //     const isExpired = now >= expirationTime;

  //     if (isExpired) {
  //       console.log("Token expired! Clearing token and headers.");
  //       setToken(null); // Clear the token from context state
  //       delete axios.defaults.headers.common["Authorization"]; // Remove Authorization token from axios headers
  //     } else {
  //       axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  //       myAxios.defaults.headers.common["Authorization"] = "Bearer " + token;
  //       localStorage.setItem("token", token);
  //     }
  //   } else {
  //     delete axios.defaults.headers.common["Authorization"];
  //     localStorage.removeItem("token");
  //   }
  // }, [token]);

  const value = {
    token,
    setToken,
    user,
    setUser: updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
