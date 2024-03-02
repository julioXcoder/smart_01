import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import avatarImage from "@/public/avatar.svg";
import { logoutUser } from "@/server/actions/auth";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { BiChevronDown, BiLayer } from "react-icons/bi";
import { FaHeadset, FaQuestionCircle } from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import { MdEvent, MdLogout } from "react-icons/md";
import ProfileThemeChanger from "../profileThemeChanger";

interface Props {
  username: string;
}

const Profile = ({ username }: Props) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = async (user: string) => {
    await logoutUser(user);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="inline-flex items-center justify-center gap-2 rounded-full bg-white py-1 pl-1 pr-2 align-middle text-sm font-medium text-gray-700 shadow-sm ring-gray-300 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 dark:border-gray-900 dark:bg-slate-950 dark:text-gray-100 dark:ring-gray-700 dark:hover:bg-gray-800 dark:hover:text-white">
          <div className="relative h-8 w-8">
            <Image
              alt="Applicant Image"
              fill
              priority
              quality={100}
              className="inline-block rounded-full object-cover"
              src={avatarImage}
            />
          </div>
          <span className="max-w-[7.5rem] truncate font-medium">
            {username}
          </span>
          <BiChevronDown size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => console.log("profile")}>
            <LuUser className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleNavigation("/applicant_portal/applications")}
          >
            <BiLayer className="mr-2 h-4 w-4" />
            <span>My Applications</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <FaQuestionCircle className="mr-2 h-4 w-4" />
            <span>How To Apply</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FaHeadset className="mr-2 h-4 w-4" />
            <span>Contact Support</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => console.log("Events")}>
            <MdEvent className="mr-2 h-4 w-4" />
            <span>Events</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <SunIcon className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span>Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <ProfileThemeChanger />
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => handleLogout("applicant")}>
            <div className="flex w-full items-center hover:text-red-500">
              <MdLogout className="mr-2 h-4 w-4" />
              <span>Log Out</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
