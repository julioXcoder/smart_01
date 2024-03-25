"use client";

import { Button } from "@/components/ui/button";
import { Step } from "./data";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import completion from "@/public/online_application/completion2.png";
import education from "@/public/online_application/education3.png";
import globe from "@/public/online_application/globe2.png";
import payment from "@/public/online_application/payment3.png";
import select from "@/public/online_application/select3.png";
import door from "@/public/online_application/welcome5.png";
import { getFormIVData } from "@/server/actions/necta";
import { zodResolver } from "@hookform/resolvers/zod";
import { CiCircleQuestion } from "react-icons/ci";
import {
  EyeClosedIcon,
  EyeOpenIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { MdArrowBackIos } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import z from "zod";
import { useForm } from "react-hook-form";
import { newApplicantAccount } from "@/server/actions/application";
import { NewApplicant } from "@/server/actions/application/schema";
import {
  FormSchema,
  applicantOrigins,
  applicationTypes,
  certificateEducationLevels,
  diplomaEducationLevels,
  indexFormat,
  mastersEducationLevels,
  phdEducationLevels,
  postgraduateDiplomaEducationLevels,
  ProgrammeLevel,
  EducationLevel,
  Origin,
} from "./data";
import { MdSchool, MdBook } from "react-icons/md";
import { FaHome, FaUserEdit } from "react-icons/fa";
import { FaClipboardList } from "react-icons/fa6";
import HeadingOne from "@/components/typography/headingOne";
import HeadingThree from "@/components/typography/headingThree";

import Welcome from "./welcome";
import Education from "./education";
import Setup from "./setup";
import Application from "./application";
import Stepper from "./stepper";

const StepperForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedApplicationType, setSelectedApplicationType] = useState<{
    label: string;
    value: ProgrammeLevel;
  } | null>(null);
  const [selectedApplicantOrigin, setSelectedApplicantOrigin] = useState<{
    label: string;
    value: Origin;
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
      firstName: "",
      middleName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
    },
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const toggleShowPass = () => setShowPass(!showPass);
  const toggleConfirmPass = () => setShowConfirm(!showConfirm);

  const handleSetCompletedOLevel = (value: string) => {
    setCompletedOLevel(value as "yes" | "no" | "");
  };

  const handleApplicationTypeChange = (selectedOption: string) => {
    const selectedApplicationTypeObject = applicationTypes.find(
      (applicationType) => applicationType.value === selectedOption,
    );

    setSelectedApplicationType(selectedApplicationTypeObject || null);
  };

  const handleSetFormIVIndex = (value: string) => {
    setFormIVIndex(value);
  };

  const handleApplicantOriginChange = (selectedOption: string) => {
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

  const getEducationLevels = (applicationType: ProgrammeLevel | "") => {
    switch (applicationType) {
      case "CERTIFICATE":
        return certificateEducationLevels;
      case "DIPLOMA":
        return diplomaEducationLevels;
      case "BACHELOR":
        return postgraduateDiplomaEducationLevels;
      case "MASTERS":
        return mastersEducationLevels;
      case "PHD":
        return phdEducationLevels;
      default:
        return [];
    }
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
      content: <Application />,
      image: select,
    },
    { label: "Setup", Icon: FaUserEdit, content: <Setup />, image: door },
    // { label: "setup", Icon: FiUser, content: <>content</> },
  ];

  const handleNext = async () => {
    setErrorMessage("");

    if (currentStep === 2 && !selectedApplicationType) {
      setErrorMessage("Please select an application type.");
      return;
    }

    if (currentStep === 3) {
      if (!completedOLevel) {
        setErrorMessage("Please confirm if you have completed O Level.");
        return;
      } else if (completedOLevel === "no") {
        setErrorMessage(
          "Unfortunately, completion of O Level is a requirement for our university. Please check back when you have completed your O Level.",
        );
        return;
      }
    }

    if (currentStep === 4 && !selectedApplicantOrigin) {
      setErrorMessage("Please select Origin of Education.");
      return;
    }

    if (currentStep === 5 && !selectedEducationLevel) {
      setErrorMessage(
        "Please select your highest level of education to proceed.",
      );
      return;
    }

    if (currentStep === 6) {
      if (!formIVIndex) {
        setErrorMessage(
          "Kindly provide your Form IV Index Number. It's crucial for us to proceed with your application.",
        );

        return;
      } else {
        const validate = indexFormat.safeParse(formIVIndex.trim());

        if (!validate.success) {
          setErrorMessage("Invalid format.");

          return;
        }

        setVerifyFormIVIndex(true);
        // FIXME: trim form IV index
        // FIXME: get the students form IV data
        const { data, error } = await getFormIVData(formIVIndex.trim());

        // FIXME: handle error
        if (error) {
          setErrorMessage(error);
          setVerifyFormIVIndex(false);
          return;
        }

        setVerifyFormIVIndex(false);
      }
    }

    if (currentStep < pages.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setErrorMessage("");
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setErrorMessage("");
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
    };

    const response = await newApplicantAccount(newApplicantData);

    if (response.redirect) {
      router.push(response.redirect);
    } else if (response.message) {
      setErrorMessage(response.message);
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
          <Image
            className="hidden h-80 w-auto lg:block"
            src={currentPage.image}
            alt="Image Description"
          />
          <div className="w-full pb-8">{currentPage.content}</div>
          <div className="fixed bottom-0 left-0 mt-6 flex w-full items-center gap-2 px-4 pb-2 lg:absolute lg:bottom-0 lg:left-auto lg:right-0 lg:w-auto">
            <Button
              variant="secondary"
              disabled={isFirstStep}
              className={`w-1/3 lg:w-auto ${isFirstStep ? "hidden" : ""}`}
              onClick={handleBack}
            >
              Previous step
            </Button>
            <Button
              className="flex flex-grow lg:flex-grow-0"
              onClick={handleNext}
            >
              Next step
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepperForm;
