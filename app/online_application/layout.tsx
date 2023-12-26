import { ReactNode } from "react";
import Navbar from "@/components/layout/navbar";
import StickyFooter from "@/components/layout/stickyFooter";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <div className="mx-auto mt-12 max-w-[85rem] p-2 sm:px-6 lg:py-14">
        {children}
      </div>
      <StickyFooter />
    </div>
  );
};

export default layout;
