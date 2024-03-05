"use client";

import BottomNavigation from "@/components/bottomNavigation";
import { Path } from "@/types";
import { useState } from "react";
import {
  FaInbox,
  FaCreditCard,
  FaGear,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import { MdChecklist } from "react-icons/md";

const paths: Path[] = [
  {
    path: ``,
    title: "draft",
    Icon: FaInbox,
  },
  {
    path: ``,
    title: "programmes",
    Icon: FaMagnifyingGlass,
  },
  {
    path: ``,
    title: "payments",
    Icon: FaCreditCard,
  },
  {
    path: ``,
    title: "settings",
    Icon: FaGear,
  },
];

const Page = () => {
  const [step, setStep] = useState(0);

  const handleGoToStep = (stepIndex: number) => {
    setStep(stepIndex);
  };

  const currentStep = paths[step];

  return (
    <div>
      {currentStep.title}

      {/* <BottomNavigation onGotoItem={handleGoToStep} index={step} items={paths} /> */}
    </div>
  );
};

export default Page;
