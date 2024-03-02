import React from "react";
import UserImg from "../../assets/demoUser.jpg";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-20 w-1/5 px-5 py-8 bg-zinc-800">
      {/* User */}
      <div className="flex flex-col gap-3 items-center">
        <img src={UserImg} className="max-w-[140px]  rounded-lg" alt="" />
        <p className="text-white">Hello, Touhid</p>
      </div>

      {/* Navigation Pages */}
      <div className="flex flex-col gap-5 text-gray-400">
        <Link to="/">Dashboard</Link>
        <Link to="/transaction">Transaction</Link>
        <Link to="/settings">Settings</Link>
      </div>

      {/* Log in-out Button */}
      <div className="py-1 px-4 bg-slate-200 rounded-full ">
        <Link className="text-gray-400">Logout</Link>
      </div>
    </div>
  );
};

export default Sidebar;
