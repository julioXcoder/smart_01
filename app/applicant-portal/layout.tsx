import MainContent from "@/components/layout/mainContent";
import { ReactNode } from "react";
import Appbar from "./appbar";
import NavigationBar from "./navigationBar";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Appbar username="julioxcoder" fullName="julio njeza" />
      <NavigationBar status="DRAFT" />
      <div className="p-2 md:ml-64">
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
};

export default Layout;
