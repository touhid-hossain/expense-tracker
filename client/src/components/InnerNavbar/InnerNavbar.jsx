import { Button } from "@/components/ui/button";
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
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useToast } from "../ui/use-toast";
import { Link, useNavigate } from "react-router-dom";
import { getInitials } from "@/lib/utils";

const InnerNavbar = () => {
  const { toast } = useToast();
  const { setToken, user } = useAuth();

  const navigate = useNavigate();
  const handleLogout = () => {
    setToken(null);
    navigate("/login");
    toast({
      title: "Logged Out Successfully",
      variant: "success",
    });
  };
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-gray-800">Dashboard</p>
      </div>
      {/* My-Account Dropdown-Menu*/}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="absolute h-8 w-8 ">
              <AvatarImage
                src={`http://localhost:5000/${user?.image_url}`}
                alt="profile picture"
                className="rounded-full"
              />
              <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
            </Avatar>
          </Button>
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
          <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default InnerNavbar;
