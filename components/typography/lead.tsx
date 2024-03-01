import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Lead = ({ children }: Props) => {
  return <p className="text-xl text-muted-foreground">{children}</p>;
};

export default Lead;
