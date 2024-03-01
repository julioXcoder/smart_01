import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Blockquote = ({ children }: Props) => {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{children}</blockquote>
  );
};

export default Blockquote;
