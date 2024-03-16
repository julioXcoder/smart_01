"use client";

import MainContent from "@/components/layout/mainContent";
import OnboardingSidebar from "@/components/student-onboarding/onboardingSidebar";
import { Tab } from "@/types";
import { useState } from "react";
import {
  FaInbox,
  FaHome,
  FaCalendar,
  FaHeadset,
  FaMapMarkerAlt,
  FaUserEdit,
} from "react-icons/fa";
import { FiBookOpen, FiList } from "react-icons/fi";
import { RiDashboardLine } from "react-icons/ri";
import Stepper from "@/components/stepper";
import { FaCheck, FaClipboardList, FaHotel } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { MdHotel } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Account from "@/components/student-onboarding/steps/account";
import Arrive from "@/components/student-onboarding/steps/arrive";
import Prepare from "@/components/student-onboarding/steps/prepare";
import Register from "@/components/student-onboarding/steps/register";
import Settle from "@/components/student-onboarding/steps/settle";
import Verify from "@/components/student-onboarding/steps/verify";
import Home from "@/components/student-onboarding/home";
import Accommodation from "@/components/student-onboarding/accommodation";

import { DocumentsSchema } from "@/components/student-onboarding/data";

const Page = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [nav, setNav] = useState(0);

  const prepareForm = useForm<z.infer<typeof DocumentsSchema>>({
    resolver: zodResolver(DocumentsSchema),
  });

  function onPrepareFormSubmit(data: z.infer<typeof DocumentsSchema>) {
    console.log(data);
  }

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

  const navs: Tab[] = [
    {
      content: (
        <Home
          activeTab={activeTab}
          tabs={tabs}
          onNextTab={handleNext}
          onPrevTab={handleBack}
        />
      ),
      label: "Overview",
      Icon: FiList,
    },
    {
      content: <Accommodation />,
      label: "accommodation",
      Icon: MdHotel,
    },
    {
      content: <>Events</>,
      label: "events",
      Icon: FaCalendar,
    },
    {
      content: <>Resources</>,
      label: "resources",
      Icon: FiBookOpen,
    },
  ];

  const handleGoToNav = (itemIndex: number) => {
    setNav(itemIndex);
  };

  const currentNav = navs[nav];

  return (
    <div>
      <OnboardingSidebar
        academicYearName="2023-2024"
        username="julioXcoder"
        fullName="Julio Njeza"
        itemIndex={nav}
        items={navs}
        onGotoItem={handleGoToNav}
      />
      <div className="p-2 md:ml-64">
        <MainContent>{currentNav.content}</MainContent>
      </div>
    </div>
  );
};

export default Page;
