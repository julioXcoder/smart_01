import Appbar from "@/components/applicant/appbar";
import DraftSidebar from "@/components/applicant/draftSidebar";
import MainContent from "@/components/layout/mainContent";
import { ReactNode } from "react";
import { getPayload } from "@/server/actions/application";

interface Props {
  children: ReactNode;
}

const Layout = async ({ children }: Props) => {
  const user = await getPayload();

  return (
    <div>
      <Appbar username={user.id} />
      <DraftSidebar />
      <div className="p-2 sm:ml-64">
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
};

export default Layout;
