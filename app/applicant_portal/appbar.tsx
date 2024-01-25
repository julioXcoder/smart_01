"use client";

import { useState, useEffect } from "react";
import Logo from "@/components/logo";
import Notifications from "@/components/notifications";
import Profile from "./profile";

interface Props {
  name: string;
  value?: number;
}

const Appbar = ({ name, value }: Props) => {
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
    <nav
      className={`fixed top-0 z-50 w-full transform border-b border-gray-200 bg-white transition-transform duration-300 dark:border-gray-700 dark:bg-gray-800 ${
        show ? "translate-y-0" : "-translate-y-full md:translate-y-0"
      }`}
    >
      <div className="p-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <Logo />
          </div>
          <div className="flex items-center">
            <div className="ml-3 flex items-center">
              <div className="flex items-center gap-3">
                <Notifications value={value} />
                <Profile />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Appbar;
