import DraftSidebar from "@/components/applicant/draftSidebar";
import MainContent from "@/components/layout/mainContent";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  params: { applicantApplicationId: string };
}

const Layout = ({ children, params: { applicantApplicationId } }: Props) => {
  return (
    <>
      <DraftSidebar applicantApplicationId={applicantApplicationId} />
      <div className="p-2 sm:ml-64">
        <MainContent>{children}</MainContent>
      </div>
    </>
  );
};

export default Layout;
