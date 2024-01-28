"use client";

import React, {
  useState,
  useEffect,
  ReactNode,
  useRef,
  ChangeEvent,
} from "react";
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
import z, { Schema } from "zod";
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
  errors?: number;
}

const EditComponent = () => {
  const [step, setStep] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const [profileErrors, setProfileErrors] = useState(0);
  const [contactErrors, setContactErrors] = useState(0);

  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<String>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setIsLoading] = useState(false);

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
  }, [isSaved]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      nida: "",
      applicantEmail: "",
      applicantPhoneNumber: "",
      citizenship: "",
      country: "",
      emergencyContactCity: "",
      emergencyContactCountry: "",
      emergencyContactEmail: "",
      emergencyContactPhoneNumber: "",
      emergencyContactPostalCode: "",
      emergencyContactRegion: "",
      emergencyContactRelation: "",
      emergencyContactStreetAddress: "",
      city: "",
      gender: "",
      region: "",
      postalCode: "",
      streetAddress: "",
      emergencyContactFullName: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    handleSaveAsDraft();

    toast.success(
      "Your application is successfully submitted and under review. Stay tuned!",
      {
        duration: 6000,
      },
    );
  }

  const handleSaveAsDraft = () => {
    const data = form.getValues();
    form.clearErrors();
    setProfileErrors(0);
    setContactErrors(0);

    toast.success("Draft saved. Resume anytime.", {
      duration: 6000,
    });
  };

  const handleSubmitApplication = () => {
    const data = form.getValues();

    const validation = FormSchema.safeParse(data);

    setProfileErrors(0);
    setContactErrors(0);

    if (!validation.success) {
      toast.error(
        "Oops! Some fields are incomplete. Please review and fill all required fields.",
        { duration: 6000 },
      );

      const profileFields = [
        "firstName",
        "middleName",
        "lastName",
        "gender",
        "citizenship",
        "nida",
      ];
      const contactFields = [
        "emergencyContactFullName",
        "applicantEmail",
        "applicantPhoneNumber",
        "streetAddress",
        "city",
        "region",
        "postalCode",
        "country",
        "emergencyContactEmail",
        "emergencyContactPhoneNumber",
        "emergencyContactStreetAddress",
        "emergencyContactCity",
        "emergencyContactRegion",
        "emergencyContactPostalCode",
        "emergencyContactCountry",
        "emergencyContactRelation",
      ];

      const profileFieldErrors = profileFields.filter(
        (field) =>
          validation.error.formErrors.fieldErrors[
            field as keyof typeof validation.error.formErrors.fieldErrors
          ],
      ).length;
      const contactFieldErrors = contactFields.filter(
        (field) =>
          validation.error.formErrors.fieldErrors[
            field as keyof typeof validation.error.formErrors.fieldErrors
          ],
      ).length;

      setProfileErrors(profileFieldErrors);
      setContactErrors(contactFieldErrors);
    }

    form.handleSubmit(onSubmit)();
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Get the first file from the input
    const file = event.target.files ? event.target.files[0] : null;
    // Update the image state variable
    setImage(file);
    // Create a temporary URL for the file
    const url = file ? URL.createObjectURL(file) : null;
    // Update the preview state variable
    setImagePreview(url);

    console.log("Call server 💻");

    event.target.value = "";
  };

  const handleFileRemove = () => {
    setImage(null);
    setImagePreview(null);
  };

  const steps: Step[] = [
    {
      label: "Priorities",
      stepContent: <Priorities />,
    },
    {
      label: "Profile",
      stepContent: (
        <Profile
          image={image}
          imagePreview={imagePreview}
          onImageDelete={handleFileRemove}
          onImageUpdate={handleImageChange}
          form={form}
        />
      ),
      errors: profileErrors,
    },
    {
      label: "Contacts",
      stepContent: <Contacts form={form} />,
      errors: contactErrors,
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
      <div className="flex w-full items-center justify-center">
        <div>
          <MobileNavigation
            step={step}
            onGotoStep={handleGoToStep}
            onNextStep={handleGoToNextStep}
            onPrevStep={handleGoToPreviousStep}
            steps={steps}
          />
        </div>
        {/* <Button>Submit Application</Button> */}
      </div>

      <div className="grid grid-cols-10">
        <div className="hidden overflow-y-auto pt-2 transition-all duration-300 md:col-span-2 md:block">
          <SideNavigation
            step={step}
            onGotoStep={handleGoToStep}
            steps={steps}
            profileErrors={profileErrors}
          />
        </div>

        <div className="col-span-10 mt-3 md:col-span-8 md:m-0">
          <Form {...form}>
            {currentStep.stepContent}

            <Button
              className="mt-2 w-full"
              variant="secondary"
              onClick={handleSaveAsDraft}
            >
              <span className="flex items-center gap-2">
                <MdOutlineAccessTime className="h-4 w-4 shrink-0" />
                Save as Draft
              </span>
            </Button>
            <Button className="mt-2 w-full" onClick={handleSubmitApplication}>
              <span className="flex items-center gap-2">
                <FaPaperPlane className="h-4 w-4 shrink-0" />
                Submit Application
              </span>
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditComponent;
