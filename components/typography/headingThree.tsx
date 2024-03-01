import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const HeadingThree = ({ children }: Props) => {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
      {children}
    </h3>
  );
};

export default HeadingThree;
