import React from "react";

import { AiFillAlert } from "react-icons/ai";

const links = [
  { path: "#", label: "Priorities" },
  { path: "#", label: "Profile" },
  { path: "#", label: "Contacts" },
  { path: "#", label: "Education" },
  { path: "#", label: "Documents" },
];

const Page = () => {
  return (
    <div className="mx-auto py-10 sm:px-6 lg:px-8 lg:py-14">
      <div className="grid grid-cols-10">
        <div className="col-span-2 overflow-y-auto border-e border-gray-200 bg-white  pb-10 pt-4 transition-all duration-300">
          <nav className="flex w-full flex-col flex-wrap p-6">
            <ul className="space-y-2">
              {links.map((link, index) => (
                <li key={index}>
                  <a
                    className="flex w-full items-center gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-slate-700 hover:bg-gray-100 dark:text-slate-400 dark:hover:bg-gray-900 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    href={link.path}
                  >
                    <AiFillAlert className="h-4 w-4 flex-shrink-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="col-span-8">content</div>
      </div>
    </div>
  );
};

export default Page;
