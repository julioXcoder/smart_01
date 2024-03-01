import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Muted = ({ children }: Props) => {
  return <p className="text-sm text-muted-foreground">{children}</p>;
};

export default Muted;
