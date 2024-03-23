import MainContent from "@/components/layout/mainContent";
import { ReactNode } from "react";
import NavigationBar from "./navigationBar";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <NavigationBar status="ACCEPTED" />
      <div className="p-2 md:ml-64">
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
};

export default Layout;
