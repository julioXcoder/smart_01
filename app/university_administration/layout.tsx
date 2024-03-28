import { ReactNode } from "react";
import Sidebar from "./sidebar";
import MainContent from "@/components/layout/mainContent";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Sidebar />
      <div className="p-2 md:ml-64">
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
};

export default Layout;
