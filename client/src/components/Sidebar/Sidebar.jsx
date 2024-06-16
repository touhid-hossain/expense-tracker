import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/provider/authProvider";
import { useUser } from "@/hooks/useUser";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "../ui/skeleton";
import { X } from "lucide-react";
import { useTransaction } from "@/provider/transactionProvider";

const Sidebar = () => {
  const { logout } = useAuth();
  const { user, isLoading } = useUser();
  const navigate = useNavigate();
  const { toggleSidebar, isOpenSidebar } = useTransaction();

  return (
    <>
      <Sheet open={isOpenSidebar}>
        <SheetContent side="left" className="w-[220px] md:w-[300px] ">
          <div
            onClick={toggleSidebar}
            className="cursor-pointer z-50 bg-slate-200 absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
          >
            <X className="h-4 w-4 rounded" />
          </div>
          <div className="flex flex-shrink-0 flex-col items-center justify-between gap-20  px-5 py-8 h-screen sticky top-0 bg-zinc-800">
            {/* User */}
            <div className="flex flex-col gap-3 items-center">
              {isLoading ? (
                <Skeleton className="w-[120px] aspect-square" />
              ) : (
                <img
                  src={user?.image_url}
                  className="max-w-[120px] object-cover aspect-square  rounded-xl"
                  alt="user-image"
                />
              )}
              <p className="text-white">Hello, {user?.lastName}</p>
            </div>

            {/* Navigation Pages */}
            <div className="flex flex-col gap-5 text-gray-400">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-accent-foreground h-10 px-4 py-2 bg-accent inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    : "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-zinc-800 border-zinc-600 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/transaction"
                className={({ isActive }) =>
                  isActive
                    ? "text-accent-foreground h-10 px-4 py-2 bg-accent inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    : "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-zinc-800 border-zinc-600 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                }
              >
                Transaction
              </NavLink>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  isActive
                    ? "text-accent-foreground h-10 px-4 py-2 bg-accent inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    : "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-zinc-800 border-zinc-600 border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                }
              >
                Settings
              </NavLink>
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
    </>
  );
};

export default Sidebar;
