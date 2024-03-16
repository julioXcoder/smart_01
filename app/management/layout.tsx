import Appbar from "@/components/applicant/appbar";
import MainContent from "@/components/layout/mainContent";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Appbar username="julioXcoder" />

      {children}
    </div>
  );
};

export default Layout;
