import MainContent from "@/components/layout/mainContent";
import { ReactNode } from "react";
import Appbar from "@/components/layout/appbar";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Appbar username="julioXcoder" imageUrl="" />

      {children}
    </div>
  );
};

export default Layout;
