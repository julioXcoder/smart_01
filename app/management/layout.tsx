import { ReactNode } from "react";
import Sidebar from "@/components/layout/sidebar";
import Appbar from "@/components/layout/appbar";
import Navbar from "@/components/layout/navbar";
import MainComponent from "@/components/layout/main";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Appbar imageUrl={""} username="julioXcoder" />
      <Sidebar />
      <MainComponent>{children}</MainComponent>
    </div>
  );
};

export default Layout;
