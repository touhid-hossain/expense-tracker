import { useToast } from "@/components/ui/use-toast";
import axios from "@/lib/axios";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(localStorage.getItem("token") || null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const setToken = (newToken) => {
    if (newToken) {
      setToken_(newToken);
      localStorage.setItem("token", newToken);
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
      // set loading true
      setIsLoading(true);

      const response = await axios.post("/user/authenticate", {
        email: values.email,
        password: values.password,
        rememberMe: values.rememberMe,
      });
      toast({
        title: "Successfully Logged In",
        variant: "success",
      });
      setIsLoading(false);
      const token = response.data.token;
      setToken(token);

      cb();
    } catch (error) {
      setIsLoading(false);
      toast({
        title: error.response.data.message,
        variant: "destructive",
      });
    }
  };

  const signUp = async (formData, cb) => {
    console.log(formData);

    try {
      // set loading true
      setIsLoading(true);

      await axios.post("/user", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setIsLoading(false);
      toast({
        title: "User created Successfully",
        variant: "success",
      });
      cb();
    } catch (error) {
      setIsLoading(false);
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
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
