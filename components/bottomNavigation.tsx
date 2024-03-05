"use client";

import { Tab } from "@/types";

interface Props {
  items: Tab[];
  itemIndex: number;
  onGotoItem: (itemIndex: number) => void;
}

const BottomNavigation = ({ items, itemIndex, onGotoItem }: Props) => {
  return (
    <div className="fixed bottom-0 left-0 z-50 h-16 w-full border-t border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800 md:hidden">
      <div className="mx-auto grid h-full max-w-lg grid-cols-4 font-medium">
        {items.map((item, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onGotoItem(index)}
            className="group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <item.Icon
              className={`mb-2 size-4 group-hover:text-blue-600 dark:group-hover:text-blue-500 ${
                index === itemIndex
                  ? "font-bold text-blue-500"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            />

            <span
              className={`group-hover:text-blue-600 dark:group-hover:text-blue-500 ${
                index === itemIndex
                  ? "text-sm font-semibold text-blue-500"
                  : "text-xs text-gray-500 dark:text-gray-400"
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
