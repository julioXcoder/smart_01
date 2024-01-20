import { ReactNode } from "react";
import Sidebar from "./sidebar";
import Navigation from "./navigation";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="mx-auto py-10 sm:px-6 lg:px-8 lg:py-14">
      <h1>USE COMPONENTS</h1>
      <div className="grid grid-cols-10">
        <Navigation />
        <div className="hidden overflow-y-auto pb-10 pt-4 transition-all duration-300 md:col-span-2 md:block">
          <Sidebar />
        </div>
        <div className="col-span-10 md:col-span-8">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
