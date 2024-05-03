import axios from "axios";
import myAxios from "../lib/axios";
import { jwtDecode } from "jwt-decode";
import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token") || null);

  // myAxios.defaults.headers.common["Authorization"] = "Bearer " + token;
  // axios.defaults.headers.common["Authorization"] = "Bearer " + token;

  const setToken = (newToken) => {
    setToken_(newToken);
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

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
