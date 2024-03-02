import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MainContent = ({ children }: Props) => {
  return (
    // <main className="p-2 sm:ml-64">
    <main className="mt-16 rounded-lg border-2 border-dashed border-gray-200 p-1 dark:border-gray-700 sm:p-4">
      {children}
    </main>
  );
};

export default MainContent;
