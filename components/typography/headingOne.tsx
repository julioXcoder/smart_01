import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const HeadingOne = ({ children }: Props) => {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  );
};

export default HeadingOne;
