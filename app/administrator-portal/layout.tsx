"use client";
import { ReactNode } from "react";
import Slim from "@/components/layout/dashboards/slim";
import { Path } from "@/types";
import { MdPersonAdd, MdDashboard } from "react-icons/md";

interface Props {
  children: ReactNode;
}

const links: Path[] = [
  {
    title: "dashboard",
    path: "/administrator-portal/dashboard",
    Icon: MdDashboard,
  },
  {
    title: "applicants",
    path: "/administrator-portal/applicants",
    Icon: MdPersonAdd,
  },
];

const Layout = ({ children }: Props) => {
  return <Slim links={links}>{children}</Slim>;
};

export default Layout;
