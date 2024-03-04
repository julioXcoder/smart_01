"use client";

import React from "react";
import Image from "next/image";
import avatarImage from "@/public/avatar.svg";
import {
  FaInbox,
  FaCreditCard,
  FaGear,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import { MdChecklist } from "react-icons/md";
import Link from "next/link";
import HeadingTwo from "../typography/headingTwo";
import { usePathname } from "next/navigation";

import { Path } from "@/types";

interface Props {
  applicantApplicationId: string;
  fullName?: string;
  username: string;
  academicYearName: string;
  imageUrl: string | null;
}

const DraftSidebar = ({
  applicantApplicationId,
  fullName,
  username,
  academicYearName,
  imageUrl,
}: Props) => {
  const pathname = usePathname();

  const paths: Path[] = [
    {
      path: `/application-portal/draft/${applicantApplicationId}`,
      title: "draft",
      Icon: FaInbox,
    },
    {
      path: `/application-portal/draft/${applicantApplicationId}/programmes`,
      title: "programmes",
      Icon: FaMagnifyingGlass,
    },
    {
      path: `/application-portal/draft/checklist/${applicantApplicationId}`,
      title: "checklist",
      Icon: MdChecklist,
    },
    {
      path: `/application-portal/draft/payments/${applicantApplicationId}`,
      title: "payments",
      Icon: FaCreditCard,
    },
    {
      path: `/application-portal/draft/settings/${applicantApplicationId}`,
      title: "settings",
      Icon: FaGear,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-20 transition-transform dark:border-gray-700 dark:bg-gray-800 sm:translate-x-0">
      <div className="h-full overflow-y-auto bg-white px-3 pb-4 dark:bg-gray-800">
        <div className="text-center">
          <HeadingTwo>{academicYearName}</HeadingTwo>
        </div>
        <div className="-mx-2 mt-6 flex flex-col items-center">
          <div className="relative mx-2 h-24 w-24">
            <Image
              alt="Applicant Image"
              fill
              quality={100}
              className="inline-block rounded-full object-cover"
              src={imageUrl ? imageUrl : avatarImage}
            />
          </div>
          <h4 className="mx-2 mt-2 font-medium text-gray-800 dark:text-gray-200">
            {fullName}
          </h4>
          <p className="mx-2 mt-1 text-sm font-medium text-gray-600 dark:text-gray-400">
            {username}
          </p>
        </div>
        <div className="mt-6 flex flex-1 flex-col justify-between">
          <nav>
            {paths.map((item, index) => (
              <Link
                href={item.path}
                key={index}
                className={`mt-5 flex transform items-center rounded-lg px-4 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-200 ${
                  pathname.endsWith(item.path)
                    ? "bg-gray-100 dark:bg-gray-900"
                    : ""
                }`}
              >
                {item.Icon && <item.Icon className="size-5 shrink-0" />}
                <span className="mx-4 font-medium">{item.title}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default DraftSidebar;
