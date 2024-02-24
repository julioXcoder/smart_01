import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MainComponent = ({ children }: Props) => {
  return (
    <main className="p-4 sm:ml-64">
      <div className="mt-20 rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700">
        {children}
      </div>
    </main>
  );
};

export default MainComponent;
