import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Small = ({ children }: Props) => {
  return <small className="text-sm font-medium leading-none">{children}</small>;
};

export default Small;
