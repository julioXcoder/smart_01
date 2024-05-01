"use client";
import { ReactNode } from "react";
import Slim from "@/components/layout/dashboards/slim";
import { Path } from "@/types";
import { MdPersonAdd, MdDashboard, MdPerson } from "react-icons/md";
import { BsStack } from "react-icons/bs";
import { FaUserCog, FaSyncAlt, FaUserCheck } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";

interface Props {
  children: ReactNode;
}

const links: Path[] = [
  {
    title: "dashboard",
    description: "dashboard",
    path: "/administrator-portal/dashboard",
    Icon: MdDashboard,
  },
  {
    title: "applications",
    description: "application review",
    path: "/administrator-portal/applications",
    Icon: BsStack,
  },
  {
    title: "applicants",
    description: "applicants",
    path: "/administrator-portal/applicants",
    Icon: MdPerson,
  },
  {
    title: "management",
    description: "Admissions management",
    path: "/administrator-portal/management",
    Icon: FaUserCog,
  },
];

const Layout = ({ children }: Props) => {
  return <Slim links={links}>{children}</Slim>;
};

export default Layout;
