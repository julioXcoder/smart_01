import MainContent from "@/components/layout/mainContent";
import { ReactNode } from "react";
import Appbar from "./appbar";
import NavigationBar from "./navigationBar";
import { getApplicantInfo } from "./actions";

interface Props {
  children: ReactNode;
}

const Layout = async ({ children }: Props) => {
  const { firstName, lastName, imageUrl, username, status } =
    await getApplicantInfo();

  return (
    <div>
      <Appbar
        username={username}
        firstName={firstName}
        lastName={lastName}
        imageUrl={imageUrl}
      />
      <NavigationBar status={status} />
      <div className="p-2 md:ml-64">
        <MainContent>{children}</MainContent>
      </div>
    </div>
  );
};

export default Layout;
