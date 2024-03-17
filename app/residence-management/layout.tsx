import { ReactNode } from "react";
import Appbar from "@/components/applicant/appbar";
import MainContent from "@/components/layout/mainContent";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Appbar username="julioXcoder" />
      <div className="p-2 md:ml-64">
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
};

export default Layout;
