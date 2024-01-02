import { ReactNode } from "react";
import Navbar from "@/components/layout/navbar";
import Appbar from "./appbar";
import StickyFooter from "@/components/layout/stickyFooter";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Appbar value={2} name="julio Njeza" />
      <div className="mx-auto max-w-[85rem] p-4 sm:p-6 my-14">{children}</div>
      <StickyFooter />
    </div>
  );
};

export default layout;
