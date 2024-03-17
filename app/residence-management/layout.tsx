import { ReactNode } from "react";
import Appbar from "./appbar";
import MainContent from "@/components/layout/mainContent";
import Sidebar from "./sidebar";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Appbar username="julioXcoder" />
      <Sidebar />
      <div className="p-2 md:ml-64">
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
};

export default Layout;
