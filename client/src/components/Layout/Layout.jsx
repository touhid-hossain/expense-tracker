import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import InnerNavbar from "../InnerNavbar/InnerNavbar";

const Layout = () => {
  return (
    <div className="flex max-w-[1920px] mx-auto bg-black">
      <Sidebar />
      <div className="flex-1 bg-white p-6">
        <InnerNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
