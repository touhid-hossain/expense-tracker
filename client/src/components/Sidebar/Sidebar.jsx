import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/provider/authProvider";
import { useUser } from "@/hooks/useUser";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const Sidebar = () => {
  const { logout } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <Sheet open={false}>
      <SheetTrigger asChild>
        {/* <Button variant="outline">Open</Button> */}
      </SheetTrigger>
      <SheetContent side="left">
        <div className="flex flex-shrink-0 flex-col items-center justify-between gap-20  px-5 py-8 h-screen sticky top-0 bg-zinc-800">
          {/* User */}
          <div className="flex flex-col gap-3 items-center">
            {user?.image_url && (
              <img
                src={`https://expense-tracker-tzs.vercel.app/${user.image_url}`}
                className="max-w-[120px] object-cover aspect-square  rounded-xl"
                alt="user-image"
              />
            )}
            <p className="text-white">Hello, {user?.name.split(" ")[0]}</p>
          </div>

          {/* Navigation Pages */}
          <div className="flex flex-col gap-5 text-gray-400">
            <Link to="/">Dashboard</Link>
            <Link to="/transaction">Transaction</Link>
            <Link to="/settings">Settings</Link>
          </div>

          {/* Log in-out Button */}
          <Button
            onClick={() => logout(() => navigate("/login"))}
            className="py-1 px-4 bg-slate-200 rounded-full text-black hover:text-white"
          >
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
