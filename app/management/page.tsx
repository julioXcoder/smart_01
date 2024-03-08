"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaMapMarkerAlt, FaUserEdit, FaHome } from "react-icons/fa";
import { FaCheck, FaClipboardList } from "react-icons/fa6";
import HeadingTwo from "@/components/typography/headingTwo";
import Small from "@/components/typography/small";
import Muted from "@/components/typography/muted";
import HeadingOne from "@/components/typography/headingOne";
import { Separator } from "@/components/ui/separator";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { FiUser } from "react-icons/fi";

import Register from "@/components/student-onboarding/steps/register";
import Verify from "@/components/student-onboarding/steps/verify";
import Prepare from "@/components/student-onboarding/steps/prepare";
import Settle from "@/components/student-onboarding/steps/settle";
import Arrive from "@/components/student-onboarding/steps/arrive";
import Account from "@/components/student-onboarding/steps/account";

const Page = () => {
  const [activeTab, setActiveTab] = useState(0);
  const handleNext = () => {
    setActiveTab((prevTab) => (prevTab + 1) % tabs.length);
  };

  const handleBack = () => {
    setActiveTab((prevTab) => (prevTab - 1 + tabs.length) % tabs.length);
  };

  const tabs = [
    { label: "Admission Confirmation", Icon: FaCheck, content: <Verify /> },
    {
      label: "Pre-Arrival Preparations",
      Icon: FaClipboardList,
      content: <Prepare />,
    },
    {
      label: "Arrival and Orientation",
      Icon: FaMapMarkerAlt,
      content: <Arrive />,
    },
    {
      label: "Registration and Payment",
      Icon: FaUserEdit,
      content: <Register />,
    },
    { label: "Settling In", Icon: FaHome, content: <Settle /> },
    { label: "Account Setup", Icon: FiUser, content: <Account /> },
  ];

  const currentTab = tabs[activeTab].content;

  return (
    <div className="px-2 md:px-10 xl:px-36">
      <div className="grid gap-4 md:grid-cols-5">
        <div className="hidden justify-between md:col-span-2 md:flex">
          <div className="flex flex-col space-y-14 px-8 py-16">
            <div className="space-y-1">
              <HeadingOne>2023-2024</HeadingOne>
              <Muted>New Student Onboarding</Muted>
            </div>
            <ol className="relative border-s-2 border-gray-200 text-gray-500 dark:border-gray-700 dark:text-gray-400">
              {tabs.map((tab, index) => (
                <li key={index} className="mb-10 ms-6 last:mb-0">
                  <span
                    className={`absolute -start-4 flex h-8 w-8 items-center justify-center rounded-full ring-4 ring-white dark:ring-gray-900 ${
                      index <= activeTab
                        ? "bg-green-200 dark:bg-green-900"
                        : "bg-gray-100 dark:bg-gray-700"
                    }`}
                  >
                    <tab.Icon className="h-3.5 w-3.5 shrink-0 text-gray-500 dark:text-gray-400" />
                  </span>
                  <h3
                    className={`font-medium leading-tight ${
                      index == activeTab
                        ? "text-lg font-bold text-green-500"
                        : ""
                    }`}
                  >
                    {tab.label}
                  </h3>
                </li>
              ))}
            </ol>
          </div>

          <div className="h-full">
            <Separator orientation="vertical" />
          </div>
        </div>
        <div className="col-span-4 flex flex-col py-6 md:col-span-3 md:px-6">
          {currentTab}

          <div className="mt-10 flex w-full justify-end">
            <Button
              onClick={handleBack}
              variant="secondary"
              disabled={activeTab === 0}
              className="mr-2"
            >
              <IoArrowBack className="mr-2 size-4 shrink-0" />
              Previous step
            </Button>
            <Button
              onClick={handleNext}
              disabled={activeTab === tabs.length - 1}
            >
              Next step
              <IoArrowForward className="ml-2 size-4 shrink-0" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
