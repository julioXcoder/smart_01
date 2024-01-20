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
    <Button className="relative h-9 w-9 rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-900 dark:bg-slate-950 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
      <span className="inline-flex h-5 w-5 items-center justify-center">
        {children}
      </span>
      {value && (
        <span className="absolute end-0 top-0 inline-flex -translate-y-1/2 translate-x-1/2 transform items-center rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-medium text-white">
          {value >= 9 ? "9+" : value}
        </span>
      )}
    </Button>
  );
};

export default Badge;
