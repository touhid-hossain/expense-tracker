import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import InnerNavbar from "../InnerNavbar/InnerNavbar";

const Layout = () => {
  return (
    <div className="flex bg-black container mt-24 p-5 gap-5">
      <Sidebar />
      <div className="w-4/5 bg-white p-6">
        <InnerNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
