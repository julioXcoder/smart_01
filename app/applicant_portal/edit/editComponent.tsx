"use client";

import React, { useState, useEffect, ReactNode } from "react";
import MobileNavigation from "./mobileNavigation";
import SideNavigation from "./sideNavigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import z from "zod";
import { FormSchema } from "./data";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaPaperPlane } from "react-icons/fa6";

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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      nida: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("logged");
    console.log(data);
    // FIXME: Call save method
  }

  const handleSaveForm = () => {
    const data = form.getValues();

    toast.success("Draft saved. Resume anytime.", {
      duration: 6000,
    });

    console.log("Data - ", data);
  };

  const steps: Step[] = [
    {
      label: "Priorities",
      stepContent: <Priorities />,
    },
    {
      label: "Profile",
      stepContent: <Profile form={form} />,
    },
    {
      label: "Contacts",
      stepContent: <Contacts form={form} />,
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
    <div>
      <div className="flex w-full items-center justify-between">
        <div>
          <MobileNavigation
            step={step}
            onGotoStep={handleGoToStep}
            onNextStep={handleGoToNextStep}
            onPrevStep={handleGoToPreviousStep}
            steps={steps}
          />
        </div>
        <Button>Submit Application</Button>
      </div>

      <div className="grid grid-cols-10">
        <div className="hidden overflow-y-auto pt-2 transition-all duration-300 md:col-span-2 md:block">
          <SideNavigation
            step={step}
            onGotoStep={handleGoToStep}
            steps={steps}
          />
        </div>

        <div className="col-span-10 mt-3 md:col-span-8 md:m-0">
          <Form {...form}>
            <form>
              {currentStep.stepContent}
              {/* FIXME: ADD A TOAST TO SHOW SAVED! */}
            </form>
          </Form>
          <Button
            className="mt-2 w-full"
            variant="secondary"
            onClick={handleSaveForm}
          >
            <span className="flex items-center gap-2">
              <MdOutlineAccessTime className="h-4 w-4 shrink-0" />
              Save as Draft
            </span>
          </Button>
          <Button
            className="mt-2 w-full"
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
          >
            <span className="flex items-center gap-2">
              <FaPaperPlane className="h-4 w-4 shrink-0" />
              Submit Application
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditComponent;
