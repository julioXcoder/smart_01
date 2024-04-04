"use client";

import Stepper from "@/components/student-onboarding/stepper";
import Account from "@/components/student-onboarding/steps/account";
import Arrive from "@/components/student-onboarding/steps/arrive";
import Prepare from "@/components/student-onboarding/steps/prepare";
import Register from "@/components/student-onboarding/steps/register";
import Settle from "@/components/student-onboarding/steps/settle";
import Verify from "@/components/student-onboarding/steps/verify";
import { Tab } from "@/types";
import { useState } from "react";
import {
  FaCheck,
  FaClipboardList,
  FaHome,
  FaMapMarkerAlt,
  FaUserEdit,
} from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { DocumentsSchema } from "@/components/student-onboarding/data";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const OffBoarding = () => {
  const [activeTab, setActiveTab] = useState(0);

  const prepareForm = useForm<z.infer<typeof DocumentsSchema>>({
    resolver: zodResolver(DocumentsSchema),
  });

  const tabs: Tab[] = [
    { label: "Verify", Icon: FaCheck, content: <Verify /> },
    {
      label: "Prepare",
      Icon: FaClipboardList,
      content: <Prepare form={prepareForm} />,
    },
    { label: "Settle", Icon: FaHome, content: <Settle /> },
    { label: "Arrive", Icon: FaMapMarkerAlt, content: <Arrive /> },
    { label: "Register", Icon: FaUserEdit, content: <Register /> },
    { label: "setup", Icon: FiUser, content: <Account /> },
  ];

  const handleNext = () => {
    setActiveTab((prevTab) => (prevTab + 1) % tabs.length);
  };

  const handleBack = () => {
    setActiveTab((prevTab) => (prevTab - 1 + tabs.length) % tabs.length);
  };

  const currentTab = tabs[activeTab];
  return (
    <div>
      <Stepper activeTab={activeTab} tabs={tabs} />
      <div className="mt-10">{currentTab.content}</div>
      <div className="mt-6">
        <button
          onClick={handleBack}
          disabled={activeTab === 0}
          className="mr-2 rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Previous page
        </button>
        <button
          onClick={handleNext}
          disabled={activeTab === tabs.length - 1}
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Next page
        </button>
      </div>
    </div>
  );
};

export default OffBoarding;
