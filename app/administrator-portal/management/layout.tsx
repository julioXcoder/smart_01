"use client";

import * as React from "react";
import NavMenu from "@/components/navMenu";
import { IoMdAdd } from "react-icons/io";
import Breadcrumb from "@/components/breadcrumb";

import { ReactNode } from "react";
import { FaUserCog, FaSyncAlt, FaUserCheck } from "react-icons/fa";
import { Path } from "@/types";

interface Props {
  children: ReactNode;
}

const links: Path[] = [
  {
    title: "management",
    path: "/administrator-portal/management",
    Icon: FaUserCog,
  },
  {
    title: "Selection Rounds",
    path: "/administrator-portal/management/selection_rounds",
    Icon: FaUserCheck,
  },
  {
    title: "Accepted Students",
    path: "/administrator-portal/management/accepted_students",
    Icon: FaUserCheck,
  },
];

const Layout = ({ children }: Props) => {
  return (
    <div>
      <div className="z-50 flex w-full flex-wrap items-center justify-between gap-2 border-b border-gray-200 py-2 text-sm dark:border-neutral-700 sm:flex-nowrap">
        <Breadcrumb />

        <NavMenu links={links} />
      </div>
      {children}
    </div>
  );
};

export default Layout;
