import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="mx-auto py-10 sm:px-6 lg:px-8 lg:py-14">{children}</div>
  );
};

export default Layout;
