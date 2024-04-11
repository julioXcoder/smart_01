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
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores
        aspernatur sed facere commodi quasi unde earum dignissimos velit
        cupiditate molestias.
      </div>
      {children}
    </div>
  );
};

export default Layout;
