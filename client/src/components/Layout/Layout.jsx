import React, { useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import InnerNavbar from "../InnerNavbar/InnerNavbar";
import { useUser } from "@/provider/userProvider";
import axios from "axios";

const Layout = ({ children }) => {
  const { user, setUser } = useUser();

  const getUserData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/user");
      setUser(response.data);
    } catch (error) {
      // console.log(error)
    }
  }

  useEffect(() => {
   if(!user) { // IMPORTANT FOR NOT CALLING SETUSER INFINITE TIMES
    getUserData();
   }
  }, [user])
  

  return (
    <div className="flex max-w-[1920px] mx-auto bg-black">
      <Sidebar />
      <div className="flex-1 bg-white p-6">
        <InnerNavbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
