"use client";

import Stepper from "@/components/stepper";
import { Tab } from "@/types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  FaCheck,
  FaClipboardList,
  FaHome,
  FaMapMarkerAlt,
  FaUserEdit,
} from "react-icons/fa";
import { FiUser } from "react-icons/fi";

const tabs: Tab[] = [
  { label: "Welcome", Icon: FaCheck, content: <>content</> },
  {
    label: "Education",
    Icon: FaClipboardList,
    content: <>content</>,
  },
  { label: "Application", Icon: FaClipboardList, content: <>content</> },
  { label: "Setup", Icon: FaUserEdit, content: <>content</> },
  // { label: "setup", Icon: FiUser, content: <>content</> },
];

const Page = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleNext = () => {
    // if (activeTab == 1) {
    //   settleForm.handleSubmit(onSettleFormSubmit)();

    //   const isFormValid = settleForm.formState.isValid;

    //   if (!isFormValid) {
    //     // If the form submission was not successful, return early and do not advance to the next tab
    //     return;
    //   }
    // }

    setActiveTab((prevTab) => (prevTab + 1) % tabs.length);
  };

  const handleBack = () => {
    setActiveTab((prevTab) => (prevTab - 1 + tabs.length) % tabs.length);
  };

  return (
    <div>
      <Stepper activeTab={activeTab} tabs={tabs} />
      <div className="mt-6"></div>
      <div className="fixed bottom-0 left-0 flex w-full items-center gap-2 px-4 pb-2 md:w-auto">
        <Button
          variant="secondary"
          size="lg"
          className="w-1/3"
          onClick={handleBack}
        >
          Back
        </Button>
        <Button className="flex flex-grow" size="lg" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Page;
