"use client";

import { useState } from "react";
import { FaMapMarkerAlt, FaUserEdit, FaHome } from "react-icons/fa";
import { FaCheck, FaClipboardList } from "react-icons/fa6";

const Stepper = () => {
  const [activeTab, setActiveTab] = useState(0);
  const handleNext = () => {
    setActiveTab((prevTab) => (prevTab + 1) % tabs.length);
  };

  const handleBack = () => {
    setActiveTab((prevTab) => (prevTab - 1 + tabs.length) % tabs.length);
  };

  const tabs = [
    { label: "Verify", Icon: FaCheck },
    { label: "Prepare", Icon: FaClipboardList },
    { label: "Arrive", Icon: FaMapMarkerAlt },
    { label: "Register", Icon: FaUserEdit },
    { label: "Settle", Icon: FaHome },
  ];

  return (
    <div>
      <ol className="mb-12 flex w-full items-center">
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
                className={`h-4 w-4 lg:h-5 lg:w-5 ${
                  index <= activeTab
                    ? "text-blue-300"
                    : "text-gray-500 dark:text-gray-100"
                }`}
              />
            </span>
            <span className="absolute top-14">{tab.label}</span>
          </li>
        ))}
      </ol>
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          disabled={activeTab === 0}
          className="mr-2 rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={activeTab === tabs.length - 1}
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Stepper;
