import { useToast } from "@/components/ui/use-toast";
import axios from "@/lib/axios";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token") || null);
  const { toast } = useToast();

  const setToken = (newToken) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
      setToken_(newToken);
    } else {
      localStorage.removeItem("token");
      setToken_(newToken);
    }
  };

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000; // Convert In Milliseconds
      const now = Date.now();
      const isExpired = now >= expirationTime;

      if (isExpired) {
        setToken(null);
      }
    }
  }, [token]);

  const login = async (values, cb) => {
    try {
      const response = await axios.post("/user/authenticate", {
        email: values.email,
        password: values.password,
      });
      if (response.status === 200) {
        toast({
          title: "Successfully Logged In",
          variant: "success",
        });
        const token = response.data.token;
        setToken(token);
        cb();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  const signUp = async (values, cb) => {
    try {
      const response = await axios.post("/user/", {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      if (response.status === 201) {
        toast({
          title: "User created Successfully",
          variant: "success",
        });
        cb();
      }
    } catch (error) {
      console.log(error);
      toast({
        title: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  const logout = (cb) => {
    setToken(null);
    cb();
    toast({
      title: "Logged Out Successfully",
      variant: "success",
    });
  };

  const value = {
    token,
    setToken,
    login,
    signUp,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
