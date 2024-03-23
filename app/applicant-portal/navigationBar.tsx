"use client";

import { Path } from "@/types";
import Link from "next/link";
import { ApplicationStatus } from "@prisma/client";
import { usePathname } from "next/navigation";
import { FaCalendar } from "react-icons/fa";
import { FaHeadset, FaMagnifyingGlass } from "react-icons/fa6";
import { FiList } from "react-icons/fi";
import { MdHotel } from "react-icons/md";

interface Props {
  status: ApplicationStatus;
}

const NavigationBar = ({ status }: Props) => {
  const pathname = usePathname();

  const links: Path[] = [
    {
      title: "dashboard",
      path: "/applicant-portal/dashboard",
      Icon: FiList,
    },
    ...(status === "DRAFT"
      ? [
          {
            title: "programmes",
            path: "/applicant-portal/programmes",
            Icon: FaMagnifyingGlass,
          },
        ]
      : []),
    ...(status === "ACCEPTED"
      ? [
          {
            title: "accommodation",
            path: "/applicant-portal/accommodation",
            Icon: MdHotel,
          },
        ]
      : []),
    ...(status === "UNDER_REVIEW"
      ? [
          {
            title: "view",
            path: "/applicant-portal/view",
            Icon: FaMagnifyingGlass,
          },
        ]
      : []),
    ...(status !== "REJECTED"
      ? [
          {
            title: "events",
            path: "/applicant-portal/events",
            Icon: FaCalendar,
          },
        ]
      : []),
    ...(status !== "REJECTED"
      ? [
          {
            title: "support",
            path: "/applicant-portal/support",
            Icon: FaHeadset,
          },
        ]
      : []),
  ];

  return (
    <>
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-24 transition-transform dark:border-gray-700 dark:bg-gray-800 sm:translate-x-0">
        <div className="h-full overflow-y-auto bg-white px-3 pb-4 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {links.map(({ title, path, Icon }, index) => (
              <li key={index}>
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
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div className="fixed bottom-0 left-0 z-50 h-12 w-full border-t border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800 md:hidden">
        {/* <div className="fixed bottom-0 left-0 z-50 h-16 w-full border-t border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800 md:hidden"> */}
        <div className="mx-auto grid h-full max-w-lg grid-cols-4 font-medium">
          {links.map(({ title, path, Icon }, index) => (
            <Link
              key={index}
              type="button"
              href={path}
              className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {Icon && (
                // FIXME: add mb-2
                <Icon
                  className={`size-6 group-hover:text-blue-600 dark:group-hover:text-blue-500 ${
                    pathname.startsWith(path)
                      ? "font-bold text-blue-500"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                />
              )}

              {/* <span
                className={`group-hover:text-blue-600 dark:group-hover:text-blue-500 ${
                  pathname.startsWith(path)
                    ? "text-sm font-semibold text-blue-500"
                    : "text-xs text-gray-500 dark:text-gray-400"
                }`}
              >
                {title}
              </span> */}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default NavigationBar;
