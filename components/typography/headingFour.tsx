import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const HeadingFour = ({ children }: Props) => {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
      {children}
    </h4>
  );
};

export default HeadingFour;
