import { ReactNode } from "react";
import Sidebar from "@/components/layout/sidebar";
import Appbar from "@/components/applicant/appbar";
import Navbar from "@/components/layout/navbar";
import MainContent from "@/components/layout/mainContent";
import DraftSidebar from "@/components/applicant/draftSidebar";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Appbar username="julioXcoder" />
      {/* <Sidebar /> */}
      <DraftSidebar />
      <div className="p-2 sm:ml-64">
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
};

export default Layout;
