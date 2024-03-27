"use client";

import { Button } from "@/components/ui/button";
import education from "@/public/online_application/education3.png";
import select from "@/public/online_application/select3.png";
import door from "@/public/online_application/welcome5.png";
// FIXME: Use to fetch applicant form IV data
// import { getFormIVData } from "../actions";
import HeadingThree from "@/components/typography/headingThree";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CiCircleQuestion } from "react-icons/ci";
import { FaHome, FaUserEdit } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";
import { MdArrowBackIos, MdBook } from "react-icons/md";
import z from "zod";
import {
  applicantOrigins,
  applicationTypes,
  certificateEducationLevels,
  diplomaEducationLevels,
  EducationLevel,
  FormSchema,
  mastersEducationLevels,
  ExaminationType,
  phdEducationLevels,
  postgraduateDiplomaEducationLevels,
  ProgrammeLevel,
  NewApplicant,
  Step,
  indexFormat,
} from "./data";

import Application from "./application";
import Education from "./education";
import Setup from "./setup";
import Stepper from "./stepper";
import Welcome from "./welcome";
import { newApplicantAccount } from "../actions";

interface Props {
  latestAcademicYearId: string;
}

const StepperForm = ({ latestAcademicYearId }: Props) => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedApplicationType, setSelectedApplicationType] = useState<{
    label: string;
    value: ProgrammeLevel;
  } | null>(null);
  const [selectedApplicantOrigin, setSelectedApplicantOrigin] = useState<{
    label: string;
    value: ExaminationType;
  } | null>(null);
  const [selectedEducationLevel, setSelectedEducationLevel] = useState<{
    label: string;
    value: EducationLevel;
  } | null>(null);
  const [completedOLevel, setCompletedOLevel] = useState<"yes" | "no" | "">("");
  const [formIVIndex, setFormIVIndex] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [verifyFormIVIndex, setVerifyFormIVIndex] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleSetCompletedOLevel = (value: string) => {
    setSelectedApplicantOrigin(null);

    setCompletedOLevel(value as "yes" | "no" | "");
  };

  const handleApplicationTypeChange = (selectedOption: string) => {
    setSelectedEducationLevel(null);

    const selectedApplicationTypeObject = applicationTypes.find(
      (applicationType) => applicationType.value === selectedOption,
    );

    setSelectedApplicationType(selectedApplicationTypeObject || null);
  };

  const handleSetFormIVIndex = (value: string) => {
    setFormIVIndex(value);
  };

  const handleApplicantOriginChange = (selectedOption: string) => {
    setFormIVIndex("");

    const selectedApplicationOriginObject = applicantOrigins.find(
      (applicationOrigin) => applicationOrigin.value === selectedOption,
    );

    setSelectedApplicantOrigin(selectedApplicationOriginObject || null);
  };

  const handleEducationChange = (
    applicationType: ProgrammeLevel,
    selectedOption: EducationLevel,
  ) => {
    let selectedEducationLevelObject: {
      label: string;
      value: EducationLevel;
    } | null = null;

    if (applicationType == "CERTIFICATE") {
      selectedEducationLevelObject =
        certificateEducationLevels.find(
          (item) => item.value === selectedOption,
        ) || null;
    }

    if (applicationType == "DIPLOMA") {
      selectedEducationLevelObject =
        diplomaEducationLevels.find((item) => item.value === selectedOption) ||
        null;
    }

    if (applicationType == "BACHELOR") {
      selectedEducationLevelObject =
        postgraduateDiplomaEducationLevels.find(
          (item) => item.value === selectedOption,
        ) || null;
    }
    if (applicationType == "MASTERS") {
      selectedEducationLevelObject =
        mastersEducationLevels.find((item) => item.value === selectedOption) ||
        null;
    }
    if (applicationType == "PHD") {
      selectedEducationLevelObject =
        phdEducationLevels.find((item) => item.value === selectedOption) ||
        null;
    }

    setSelectedEducationLevel(selectedEducationLevelObject);
  };

  const pages: Step[] = [
    { label: "Welcome", Icon: FaHome, content: <Welcome />, image: door },
    {
      label: "Education",
      Icon: MdBook,
      content: (
        <Education
          onSetOLevelChange={handleSetCompletedOLevel}
          completedOLevel={completedOLevel}
          onApplicationOriginChange={handleApplicantOriginChange}
          selectedApplicantOrigin={selectedApplicantOrigin}
          onSetFormIvIndex={handleSetFormIVIndex}
          formIVIndex={formIVIndex}
        />
      ),
      image: education,
    },
    {
      label: "Application",
      Icon: FaClipboardList,
      content: (
        <Application
          onApplicationTypeChange={handleApplicationTypeChange}
          selectedApplicationType={selectedApplicationType}
          onEducationChange={handleEducationChange}
          selectedEducationLevel={selectedEducationLevel}
        />
      ),
      image: select,
    },
    {
      label: "Setup",
      Icon: FaUserEdit,
      content: <Setup form={form} />,
    },
    // { label: "setup", Icon: FiUser, content: <>content</> },
  ];

  const handleNext = async () => {
    const errorDuration = 6000;

    const checkStepOne = () => {
      if (!completedOLevel) {
        toast.error("Please confirm if you have completed O Level.", {
          duration: errorDuration,
        });
        return false;
      } else if (completedOLevel === "no") {
        toast.error(
          "Unfortunately, completion of O Level is a requirement for our university. Please check back when you have completed your O Level.",
          { duration: errorDuration },
        );
        return false;
      }

      if (!selectedApplicantOrigin) {
        toast.error("Please select Origin of Education.", {
          duration: errorDuration,
        });
        return false;
      }

      if (!formIVIndex) {
        toast.error(
          "Kindly provide your Form IV Index Number. It's crucial for us to proceed with your application.",
          {
            duration: errorDuration,
          },
        );
        return false;
      } else {
        const validate = indexFormat.safeParse(formIVIndex.trim());

        if (!validate.success) {
          toast.error("Invalid form IV index format format.", {
            duration: errorDuration,
          });

          return false;
        }
      }

      return true;
    };

    const checkStepTwo = () => {
      if (!selectedApplicationType) {
        toast.error("Please select an application type.", {
          duration: errorDuration,
        });
        return false;
      }

      if (!selectedEducationLevel) {
        toast.error(
          "Please select your highest level of education to proceed.",
          { duration: errorDuration },
        );
        return false;
      }

      return true;
    };

    if (currentStep === 1 && !checkStepOne()) return;
    if (currentStep === 2 && !checkStepTwo()) return;

    if (isLastStep) {
      form.handleSubmit(onSubmit)();
    } else if (currentStep < pages.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // FIXME: Check for formIV index
  // if (currentStep === 6) {
  //   if (!formIVIndex) {
  //     setErrorMessage(
  //       "Kindly provide your Form IV Index Number. It's crucial for us to proceed with your application.",
  //     );

  //     return;
  //   } else {
  //     const validate = indexFormat.safeParse(formIVIndex.trim());

  //     if (!validate.success) {
  //       setErrorMessage("Invalid format.");

  //       return;
  //     }

  //     setVerifyFormIVIndex(true);
  //     // FIXME: trim form IV index
  //     // FIXME: get the students form IV data
  //     const { data, error } = await getFormIVData(formIVIndex.trim());

  //     // FIXME: handle error
  //     if (error) {
  //       setErrorMessage(error);
  //       setVerifyFormIVIndex(false);
  //       return;
  //     }

  //     setVerifyFormIVIndex(false);
  //   }
  // }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    if (
      !selectedApplicantOrigin ||
      !selectedApplicationType ||
      !selectedEducationLevel ||
      !formIVIndex
    ) {
      return;
    }

    const origin = selectedApplicantOrigin.value;
    const highestEducationLevel = selectedEducationLevel.value;
    const applicationType = selectedApplicationType.value;

    const newApplicantData: NewApplicant = {
      ...data,
      origin,
      highestEducationLevel,
      applicationType,
      formIVIndex,
      latestAcademicYearId,
    };

    const response = await newApplicantAccount(newApplicantData);

    if (response.redirect) {
      router.push(response.redirect);
    } else if (response.message) {
      toast.error(response.message, { duration: 6000 });
      setIsLoading(false);
    }
  };

  const isLastStep = currentStep === pages.length - 1;
  const isFirstStep = currentStep === 0;

  const currentPage = pages[currentStep];

  return (
    <div>
      <div className="flex items-center justify-between px-2">
        <MdArrowBackIos className="size-6 flex-shrink-0 lg:hidden" />
        <HeadingThree>Online Application</HeadingThree>
        <CiCircleQuestion className="size-7 flex-shrink-0 lg:hidden" />
      </div>
      <div className="px-2 py-8 md:px-20 xl:px-36">
        <Stepper activeTab={currentStep} tabs={pages} />

        <div className="mt-5 grid gap-8 lg:relative lg:grid-cols-2 lg:items-center lg:justify-center">
          {isLastStep ? (
            <div className="hidden rounded-lg bg-white shadow-md dark:bg-gray-900 lg:block">
              <h2 className="border-b border-gray-200 py-4 text-2xl font-semibold dark:border-gray-800 md:px-6">
                Account Creation
              </h2>
              <div className="hidden p-6 lg:block">
                <p>
                  Almost there! Now, let’s create your account. This will be
                  your gateway to complete the application process and beyond.
                  Please provide your contact information, including your phone
                  number and email address. Make sure they are both correct as
                  we will use them for all future communications. Next, create a
                  password for your account and confirm it. Remember, your
                  password should be strong and secure to protect your account.
                  Your username will be your Form IV Index Number. This is to
                  ensure uniqueness and easy recall. Once you’ve filled in all
                  the information, click ‘Create Account’
                </p>
              </div>
            </div>
          ) : (
            <>
              {currentPage.image && (
                <Image
                  className="hidden h-80 w-auto lg:block"
                  src={currentPage.image}
                  alt="Image Description"
                />
              )}
            </>
          )}

          <div className="w-full pb-8">{currentPage.content}</div>
          <div className="fixed bottom-0 left-0 mt-6 flex w-full items-center gap-2 px-4 pb-2 lg:absolute lg:bottom-0 lg:left-auto lg:right-0 lg:w-auto">
            <Button
              variant="secondary"
              disabled={isFirstStep || loading}
              className={`w-1/3 lg:w-auto ${isFirstStep ? "hidden" : ""}`}
              onClick={handleBack}
            >
              Previous step
            </Button>
            <Button
              className="flex flex-grow lg:flex-grow-0"
              onClick={handleNext}
              disabled={loading}
            >
              {isLastStep ? "Create account" : "Next step"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepperForm;
