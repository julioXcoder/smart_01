import Appbar from "@/components/layout/appbar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Appbar value={2} name="julio Njeza" />
      <div className="mx-auto my-14 max-w-[85rem] p-4 sm:p-6">{children}</div>
      {/* <StickyFooter /> */}
    </div>
  );
};

export default layout;
