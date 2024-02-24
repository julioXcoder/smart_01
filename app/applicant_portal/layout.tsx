import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      {children}

      {/* <StickyFooter /> */}
    </div>
  );
};

export default layout;
