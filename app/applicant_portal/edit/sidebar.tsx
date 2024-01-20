"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { AiFillAlert } from "react-icons/ai";
import { links } from "./data";

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex w-full flex-col flex-wrap p-6">
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              className={`flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-slate-700 dark:text-slate-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 ${
                pathname.startsWith(link.path)
                  ? "bg-gray-200 dark:bg-gray-700"
                  : "hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:text-slate-300"
              }`}
              href={link.path}
            >
              <AiFillAlert className="h-4 w-4 flex-shrink-0" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
