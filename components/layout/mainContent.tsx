import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MainContent = ({ children }: Props) => {
  return (
    <main className="p-2 sm:ml-64">
      <div className="mt-16 rounded-lg border-2 border-dashed border-gray-200 px-1 py-2 dark:border-gray-700 sm:p-4">
        {children}
      </div>
    </main>
  );
};

export default MainContent;
