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
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { BiChevronDown, BiLayer } from "react-icons/bi";
import { FaHeadset, FaQuestionCircle } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { LuUser } from "react-icons/lu";
import { MdEvent, MdLogout } from "react-icons/md";
import ProfileThemeChanger from "./profileThemeChanger";
import Link from "next/link";
import Image from "next/image";

interface Props {
  firstName: string;
  lastName: string;
  username: string;
  imageUrl: string | null;
}

const Profile = ({ firstName, lastName, username, imageUrl }: Props) => {
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
              src={imageUrl ? imageUrl : ""}
            />
          </div>
          <span className="max-w-[7.5rem] truncate font-medium">
            {firstName.trim() ? `${firstName} ${lastName}` : username}
          </span>
          <BiChevronDown size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href="/applicant_portal/profile"
              className="flex w-full items-center"
            >
              <LuUser className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href="/applicant_portal/dashboard"
              className="flex w-full items-center justify-between"
            >
              <div className="flex items-center">
                <BiLayer className="mr-2 h-4 w-4" />
                <span>My Application</span>
              </div>
              {/* <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-800 dark:bg-blue-800/30 dark:text-blue-50">
                4
              </div> */}
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href="/applicant_portal/programmes"
              className="flex w-full items-center"
            >
              <IoSearch className="mr-2 h-4 w-4" />
              <span>Search Programmes</span>
            </Link>
          </DropdownMenuItem>
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
          <DropdownMenuItem>
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
          <DropdownMenuItem>
            <Link
              href="/api/logout/applicant"
              className="flex w-full items-center"
            >
              <div className="flex w-full items-center hover:text-red-500">
                <MdLogout className="mr-2 h-4 w-4 " />
                <span>Log Out</span>
              </div>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Profile;
