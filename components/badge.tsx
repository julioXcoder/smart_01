import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

const Badge = ({
  children,
  value,
}: {
  children: ReactNode;
  value?: number;
}) => {
  return (
    <button
      type="button"
      className="relative h-9 w-9 text-sm font-semibold rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-950 dark:border-gray-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
    >
      <span className="h-5 w-5 inline-flex justify-center items-center">
        {children}
      </span>
      {value && (
        <span className="absolute top-0 end-0 inline-flex items-center py-0.5 px-1.5 rounded-full text-xs font-medium transform -translate-y-1/2 translate-x-1/2 bg-red-500 text-white">
          {value >= 9 ? "9+" : value}
        </span>
      )}
    </button>
  );
};

export default Badge;
