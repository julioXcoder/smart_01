import { ReactNode } from "react";
import Sidebar from "@/components/layout/sidebar";
import Appbar from "@/components/layout/appbar";
import Navbar from "@/components/layout/navbar";
import MainContent from "@/components/layout/mainContent";
import DraftSidebar from "@/components/applicant/draftSidebar";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Appbar imageUrl={""} username="julioXcoder" />
      {/* <Sidebar /> */}
      <DraftSidebar />
      <MainContent>{children}</MainContent>
    </div>
  );
};

export default Layout;
