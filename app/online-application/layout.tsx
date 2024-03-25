import { ReactNode } from "react";
import Navbar from "@/components/layout/navbar";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      <div className="mx-auto my-14 max-w-[85rem] p-4 sm:p-6">{children}</div>
    </div>
  );
};

export default Layout;
