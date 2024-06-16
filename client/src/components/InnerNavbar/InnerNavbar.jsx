import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/provider/authProvider";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/hooks/useUser";
import { AvatarFallback } from "../ui/avatar";

const InnerNavbar = () => {
  const { logout } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4">
        <p className="text-gray-800 text-2xl font-bold">Expense Tracker</p>
      </div>
      {/* My-Account Dropdown-Menu*/}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="cursor-pointer">
            <Avatar>
              <AvatarImage
                src={user?.image_url}
                alt="profile picture"
                className="rounded-full w-12 aspect-square object-cover"
              />
              <AvatarFallback className="p-2">
                {user?.lastName.charAt[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal cursor-pointer">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link to="/">
              <DropdownMenuItem className="cursor-pointer">
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            <Link to="/transaction">
              <DropdownMenuItem className="cursor-pointer">
                Transaction
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            <Link to="/settings">
              <DropdownMenuItem className="cursor-pointer">
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => logout(() => navigate("/login"))}
          >
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default InnerNavbar;
