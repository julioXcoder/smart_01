import { ReactNode } from "react";
import Navbar from "@/components/layout/navbar";
import StickyFooter from "@/components/layout/stickyFooter";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-[85rem] p-4 sm:p-6 my-14">{children}</div>
      <StickyFooter />
    </div>
  );
};

export default layout;
