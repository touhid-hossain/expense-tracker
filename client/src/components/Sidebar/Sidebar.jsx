import React from "react";
import UserImg from "../../assets/demoUser.jpg";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/provider/authProvider";
import { useToast } from "../ui/use-toast";

const Sidebar = () => {
  const { setToken } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    setToken();
    toast({
      title: "Logged Out Successfully",
      variant: 'success'
    })
  }

  return (
    <div className="flex flex-shrink-0 flex-col items-center justify-between gap-20 w-[320px] px-5 py-8 h-screen sticky top-0 bg-zinc-800">
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
      <Button
        onClick={handleLogout}
        className="py-1 px-4 bg-slate-200 rounded-full text-black hover:text-white"
      >
        Logout
      </Button>

    </div>
  );
};

export default Sidebar;
