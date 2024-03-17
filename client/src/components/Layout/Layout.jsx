import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import InnerNavbar from "../InnerNavbar/InnerNavbar";

const Layout = ({ children }) => {
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
