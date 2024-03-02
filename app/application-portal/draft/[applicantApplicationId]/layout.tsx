import DraftSidebar from "@/components/applicant/draftSidebar";
import MainContent from "@/components/layout/mainContent";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <DraftSidebar />
      <div className="p-2 sm:ml-64">
        <MainContent>{children}</MainContent>
      </div>
    </>
  );
};

export default Layout;
