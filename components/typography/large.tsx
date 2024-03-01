import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Large = ({ children }: Props) => {
  return <div className="text-lg font-semibold">{children}</div>;
};

export default Large;
