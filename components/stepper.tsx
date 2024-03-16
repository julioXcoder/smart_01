"use client";

import { Tab } from "@/types";
import { useEffect, useState } from "react";

interface Props {
  tabs: Tab[];
  activeTab: number;
}

const Stepper = ({ tabs, activeTab }: Props) => {
  const [show, setShow] = useState(true);
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;

      if (currentScrollPos < scrollPos) {
        setShow(true);
      } else {
        setShow(false);
      }
      setScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollPos]);

  return (
    <ol
      className={`sticky z-20 flex w-full items-center md:top-20 ${
        show ? "top-16" : "top-2"
      }`}
    >
      {tabs.map((tab, index) => (
        <li
          key={index}
          className={`relative flex w-full items-center text-sm ${
            index <= activeTab
              ? "text-blue-600 after:border-blue-100 dark:text-blue-500"
              : "after:border-gray-100 dark:after:border-gray-700"
          } after:inline-block after:h-1 after:w-full after:border-4 after:border-b  after:content-[''] last:w-auto last:after:border-0 last:after:border-none`}
        >
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full lg:h-12 lg:w-12 ${
              index <= activeTab
                ? "bg-blue-100 dark:bg-blue-800"
                : "bg-gray-100 dark:bg-gray-700"
            }`}
          >
            <tab.Icon
              className={`size-4 lg:size-5 ${
                index <= activeTab
                  ? "text-blue-300"
                  : "text-gray-500 dark:text-gray-100"
              }`}
            />
          </span>
          <span className="absolute top-14 hidden text-xs md:flex md:text-sm">
            {show && tab.label}
          </span>
        </li>
      ))}
    </ol>
  );
};

export default Stepper;
