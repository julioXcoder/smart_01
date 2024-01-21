"use client";

import React, { useState, useEffect, ReactNode } from "react";
import MobileNavigation from "./mobileNavigation";
import SideNavigation from "./sideNavigation";

import Profile from "./profile";
import Priorities from "./priorities";
import Contacts from "./contacts";
import Education from "./education";
import Attachments from "./attachments";

interface Step {
  label: string;
  stepContent: ReactNode;
}

const EditComponent = () => {
  const [step, setStep] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isSaved) {
        // Add this condition
        event.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isSaved]); // Add this dependency

  const steps: Step[] = [
    {
      label: "Priorities",
      stepContent: <Priorities />,
    },
    {
      label: "Profile",
      stepContent: <Profile />,
    },
    {
      label: "Contacts",
      stepContent: <Contacts />,
    },
    {
      label: "Education",
      stepContent: <Education />,
    },
    {
      label: "Attachments",
      stepContent: <Attachments />,
    },
  ];

  const handleGoToNextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleGoToPreviousStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleGoToStep = (stepIndex: number) => {
    setStep(stepIndex);
  };

  const currentStep = steps[step];

  return (
    <div className="grid grid-cols-10">
      <div className="hidden overflow-y-auto pb-10 pt-4 transition-all duration-300 md:col-span-2 md:block">
        <SideNavigation step={step} onGotoStep={handleGoToStep} steps={steps} />
      </div>
      <div className="col-span-10 md:col-span-8">
        <MobileNavigation
          step={step}
          onGotoStep={handleGoToStep}
          onNextStep={handleGoToNextStep}
          onPrevStep={handleGoToPreviousStep}
          steps={steps}
        />
        <div className="mt-5">{currentStep.stepContent}</div>
      </div>
    </div>
  );
};

export default EditComponent;
