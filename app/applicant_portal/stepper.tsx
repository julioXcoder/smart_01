"use client";

import React, { useState } from "react";
import {
  CheckIcon,
  IdCardIcon,
  InfoCircledIcon,
  ClipboardIcon,
  ClipboardCopyIcon,
} from "@radix-ui/react-icons";

const steps = [
  {
    title: "Personal Info",
    content: "Step details here",
    icon: <IdCardIcon />,
  },
  {
    title: "Account Info",
    content: "Step details here",
    icon: <InfoCircledIcon />,
  },
  { title: "Review", content: "Step details here", icon: <ClipboardIcon /> },
  {
    title: "Confirmation",
    content: "Step details here",
    icon: <ClipboardCopyIcon />,
  },
];

const Stepper = () => {
  const [activeStep, setActiveStep] = useState(2);

  return (
    <ol className="relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
      {steps.map((step, index) => (
        <li
          key={index}
          className={`mb-10 ms-6 ${
            activeStep === index
              ? "bg-green-200 dark:bg-green-900"
              : "bg-gray-100 dark:bg-gray-700"
          }`}
        >
          <span
            className={`absolute flex items-center justify-center w-8 h-8  rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 ${
              index <= activeStep
                ? "bg-green-300"
                : "bg-gray-100 dark:bg-gray-700"
            }`}
          >
            {index <= activeStep ? <CheckIcon /> : step.icon}
          </span>
          <h3 className="font-medium leading-tight">{step.title}</h3>
          <p className="text-sm">{step.content}</p>
        </li>
      ))}
    </ol>
  );
};

export default Stepper;
