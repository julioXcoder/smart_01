"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsGridFill } from "react-icons/bs";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaUniversity } from "react-icons/fa";
import { GoChecklist } from "react-icons/go";
import { IconType } from "react-icons";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Path {
  title: string;
  path: string;
  Icon?: IconType;
  subPaths?: Path[];
}

const links: Path[] = [
  {
    title: "dashboard",
    path: "/university_administration/dashboard",
    Icon: BsGridFill,
  },
  {
    title: "institutional",
    path: "",
    Icon: FaUniversity,
    subPaths: [
      {
        title: "campuses",
        path: "/university_administration/institutional-development/campus",
      },
      {
        title: "colleges",
        path: "/university_administration/institutional-development/college",
      },
      {
        title: "departments",
        path: "/university_administration/institutional-development/department",
      },
      {
        title: "programmes",
        path: "/university_administration/institutional-development/programme",
      },
    ],
  },
  {
    title: "results",
    path: "/student_portal/results",
    Icon: GoChecklist,
  },
  {
    title: "gazette",
    path: "/student_portal/gazette",
    Icon: IoNewspaperOutline,
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-24 transition-transform dark:border-gray-700 dark:bg-gray-800 sm:translate-x-0">
      <div className="h-full overflow-y-auto bg-white px-3 pb-4 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {links.map(({ title, path, Icon, subPaths }, index) => (
            <li key={index}>
              {subPaths ? (
                <Accordion type="single" collapsible className="w-full ">
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger
                      className={`group rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                        subPaths.some((subPath) =>
                          pathname.startsWith(subPath.path),
                        )
                          ? "bg-gray-100 dark:bg-gray-700"
                          : ""
                      }`}
                    >
                      <span className="flex items-center">
                        {Icon && (
                          <Icon
                            size={26}
                            className={`flex-shrink-0 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white ${
                              subPaths.some((subPath) =>
                                pathname.startsWith(subPath.path),
                              )
                                ? "text-gray-900 dark:text-white"
                                : "text-gray-500 dark:text-gray-400"
                            }`}
                          />
                        )}
                        <span className="ml-3 capitalize">{title}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="ml-5 flex flex-col gap-3 p-3">
                      {subPaths.map((subPath, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subPath.path}
                          className={`group rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                            pathname.startsWith(subPath.path)
                              ? "bg-gray-100 dark:bg-gray-700"
                              : ""
                          }`}
                        >
                          {subPath.title}
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <Link
                  href={path}
                  className={`group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 ${
                    pathname.startsWith(path)
                      ? "bg-gray-100 dark:bg-gray-700"
                      : ""
                  }`}
                >
                  {Icon && (
                    <Icon
                      size={26}
                      className={`flex-shrink-0 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-white ${
                        pathname.startsWith(path)
                          ? "text-gray-900 dark:text-white"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    />
                  )}
                  <span className="ml-3 capitalize">{title}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
