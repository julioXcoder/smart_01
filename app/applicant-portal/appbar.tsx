"use client";

import { useState, useEffect } from "react";
import Logo from "@/components/logo";
import Notifications from "@/components/notifications";
import Profile from "./profile";
import useScrollListener from "@/hooks/useScrollListener";
import { ApplicantNotification } from "@prisma/client";

interface Props {
  username: string;
  notifications?: ApplicantNotification[];
  firstName: string;
  lastName: string;
  imageUrl: string;
}

const Appbar = ({
  notifications,
  username,
  firstName,
  lastName,
  imageUrl,
}: Props) => {
  const showOnScroll = useScrollListener();

  return (
    <nav
      className={`fixed top-0 z-50 w-full transform border-b border-gray-200 bg-white transition-transform duration-300 dark:border-gray-700 dark:bg-gray-800 ${
        showOnScroll ? "translate-y-0" : "-translate-y-full md:translate-y-0"
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
                {notifications && (
                  <Notifications value={notifications.length} />
                )}
                <Profile
                  imageUrl={imageUrl}
                  firstName={firstName}
                  lastName={lastName}
                  username={username}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Appbar;
