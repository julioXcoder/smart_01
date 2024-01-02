"use client";

// import { getFormIVData, newApplicantAccount } from "@/server/actions/applicant";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";
import {
  EyeOpenIcon,
  EyeClosedIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import z from "zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getFormIVData } from "@/server/actions/applicant";
import door from "@/public/online_application/welcome5.png";
import payment from "@/public/online_application/payment3.png";
import select from "@/public/online_application/select3.png";
import completion from "@/public/online_application/completion2.png";
import globe from "@/public/online_application/globe2.png";
import education from "@/public/online_application/education3.png";

const applicationTypes = [
  { label: "Certificate", value: "certificate" },
  { label: "Diploma", value: "diploma" },
  { label: "Postgraduate Diploma", value: "postgraduateDiploma" },
  { label: "Masters", value: "masters" },
  { label: "phD", value: "phd" },
];

const applicantOrigins = [
  { label: "Tanzania - NECTA", value: "necta" },
  { label: "NON NECTA - Foreign", value: "foreign" },
  { label: "Tanzania NECTA before 1988", value: "necta1988" },
];

const certificateEducationLevels = [
  { label: "Form IV", value: "formIV" },
  { label: "Veta NVA III", value: "vetaNVAIII" },
];

const diplomaEducationLevels = [
  { label: "Form IV", value: "formIV" },
  { label: "Veta NVA III", value: "vetaNVAIII" },
  { label: "NTA Level 4", value: "ntaLevel4" },
  { label: "Form VI", value: "formVI" },
  { label: "NTA Level 5", value: "ntaLevel5" },
];

const postgraduateDiplomaEducationLevels = [
  { label: "Degree", value: "degree" },
];

const mastersEducationLevels = [
  { label: "Degree", value: "degree" },
  { label: "Postgraduate Diploma", value: "postgraduateDiploma" },
];

const phdEducationLevels = [{ label: "Masters", value: "masters" }];

const phoneRegex = /^\+\d{3}\d{6,9}$/;

const indexFormat = z.string().regex(/^[SP]\d{4}\/\d{4}\/\d{4}$/);

const schema = z
  .object({
    formIVIndex: z.string().min(1, { message: "Form IV Index  is required" }),
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(8, {
      message: "Confirm password must be at least 8 characters long",
    }),
    email: z.string().optional(),
    phone: z.string().refine((value) => {
      return phoneRegex.test(value);
    }, "Please enter your phone number in the following format: '+255123456789"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

const StepperForm = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedApplicationType, setSelectedApplicationType] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [selectedApplicantOrigin, setSelectedApplicantOrigin] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [selectedEducationLevel, setSelectedEducationLevel] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [completedOLevel, setCompletedOLevel] = useState<"yes" | "no" | "">("");
  const [formIVIndex, setFormIVIndex] = useState("");
  const [loading, setIsLoading] = useState(false);
  const [studentInformation, setStudentInformation] = useState({
    firstName: "",
    lastName: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const toggleShowPass = () => setShowPass(!showPass);
  const toggleConfirmPass = () => setShowConfirm(!showConfirm);

  let pages: any[] = new Array(8);

  const handleApplicationTypeChange = (selectedOption: string) => {
    const selectedApplicationTypeObject = applicationTypes.find(
      (applicationType) => applicationType.value === selectedOption
    );

    setSelectedApplicationType(selectedApplicationTypeObject || null);
  };

  const handleApplicantOriginChange = (selectedOption: string) => {
    const selectedApplicationOriginObject = applicantOrigins.find(
      (applicationOrigin) => applicationOrigin.value === selectedOption
    );

    setSelectedApplicantOrigin(selectedApplicationOriginObject || null);
  };

  const handleEducationChange = (
    applicationType: string,
    selectedOption: string
  ) => {
    let selectedEducationLevelObject: { value: string; label: string } = {
      value: "",
      label: "",
    };

    if (applicationType == "certificate") {
      selectedEducationLevelObject = certificateEducationLevels.find(
        (item) => item.value === selectedOption
      ) || { value: "", label: "" };
    }

    if (applicationType == "diploma") {
      selectedEducationLevelObject = diplomaEducationLevels.find(
        (item) => item.value === selectedOption
      ) || { value: "", label: "" };
    }

    if (applicationType == "postgraduateDiploma") {
      selectedEducationLevelObject = postgraduateDiplomaEducationLevels.find(
        (item) => item.value === selectedOption
      ) || { value: "", label: "" };
    }
    if (applicationType == "masters") {
      selectedEducationLevelObject = mastersEducationLevels.find(
        (item) => item.value === selectedOption
      ) || { value: "", label: "" };
    }
    if (applicationType == "phd") {
      selectedEducationLevelObject = phdEducationLevels.find(
        (item) => item.value === selectedOption
      ) || { value: "", label: "" };
    }

    setSelectedEducationLevel(selectedEducationLevelObject);
  };

  const getEducationLevels = (applicationType: string) => {
    switch (applicationType) {
      case "certificate":
        return certificateEducationLevels;
      case "diploma":
        return diplomaEducationLevels;
      case "postgraduateDiploma":
        return postgraduateDiplomaEducationLevels;
      case "masters":
        return mastersEducationLevels;
      case "phd":
        return phdEducationLevels;
      default:
        return [];
    }
  };

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
          "Unfortunately, completion of O Level is a requirement for our university. Please check back when you have completed your O Level."
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
        "Please select your highest level of education to proceed."
      );
      return;
    }

    if (currentStep === 6) {
      if (!formIVIndex) {
        setErrorMessage(
          "Kindly provide your Form IV Index Number. It's crucial for us to proceed with your application."
        );

        return;
      } else {
        const validate = indexFormat.safeParse(formIVIndex.trim());

        if (!validate.success) {
          setErrorMessage("Invalid format.");

          return;
        }

        setIsLoading(true);
        // FIXME: trim form IV index
        // FIXME: get the students form IV data
        const { data, error } = await getFormIVData(formIVIndex.trim());

        // FIXME: handle error
        if (error) {
          setErrorMessage(error);
          setIsLoading(false);
          return;
        }

        setIsLoading(false);
      }
    }

    if (currentStep < pages.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log(formIVIndex);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);

    try {
      // const redirect = await newApplicantAccount(formData);
      // router.push(redirect);
      console.log(formData);
    } catch (error) {
      setErrorMessage(
        "We’re sorry, but we were unable to create your account at this time. Please try again later, and if the problem persists, reach out to our support team for assistance."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isLastStep = currentStep === pages.length - 1;
  const isFirstStep = currentStep === 0;

  return (
    <div className="px-5 py-8 md:px-20 xl:px-36">
      {/* <h2 className="py-6 text-4xl font-semibold">
        Online Application Step {`(${currentStep + 1}/${pages.length})`}
      </h2> */}
      <div>
        {currentStep === 0 && (
          <div className="grid items-center justify-center gap-8 md:grid-cols-2">
            <Image
              className="h-80 w-auto hidden md:block"
              src={door}
              alt="Image Description"
            />
            <div>
              <h2 className="px-6 py-4 text-2xl font-semibold">Warm Welcome</h2>
              <div className="p-6">
                <p>
                  Welcome to our University Application Portal! We’re thrilled
                  you’re considering us for your academic journey. Our
                  institution is known for its diverse and enriching
                  environment, designed to foster growth and learning. We’ve
                  made our application process as straightforward as possible
                  for your convenience. Remember, this isn’t just an
                  application; it’s the first step towards a future filled with
                  endless opportunities. Are you ready to embark on this
                  exciting journey? If so, click ‘Next’ to begin.
                </p>
              </div>
            </div>
          </div>
        )}
        {currentStep === 1 && (
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="px-6 py-4 text-2xl font-semibold">
                Application Fee
              </h2>
              <div className="p-6">
                <p>
                  Next, let&apos;s talk about the application fee. To process
                  your application, we require 10,000 Tanzanian Shillings to
                  process your application. Please make sure to pay this within
                  four days of starting your application. If the fee isn&apos;t
                  paid within this time, we&apos;ll have to delete your account
                  permanently. We don&apos;t want that to happen, so please
                  don&apos;t forget! Click &apos;Next&apos; when you&apos;re
                  ready to proceed.
                </p>
              </div>
            </div>
            <Image
              className="h-80 w-auto hidden md:block"
              src={payment}
              alt="Image Description"
            />
          </div>
        )}
        {currentStep === 2 && (
          <div className="grid gap-8 md:grid-cols-2">
            <Image
              className="h-80 w-auto hidden md:block"
              src={select}
              alt="Image Description"
            />
            <div>
              <h2 className="px-6 py-4 text-2xl font-semibold">
                Choose Your Path
              </h2>
              <div className="p-6">
                <p>
                  Fantastic! Your first step is to select the type of
                  application. We offer a variety of programs. Please choose the
                  one that aligns with your academic aspirations from the
                  dropdown menu. Remember, this is the start of your journey to
                  success. Once you’ve made your selection, click ‘Next’.
                </p>
                <div className="my-3">
                  <Select
                    onValueChange={(value: string) => {
                      handleApplicationTypeChange(value);
                    }}
                    value={selectedApplicationType?.value || ""}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Application Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select Application Type</SelectLabel>
                        {applicationTypes.map((applicationType) => (
                          <SelectItem
                            key={applicationType.value}
                            value={applicationType.value}
                          >
                            {applicationType.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div className="grid gap-8 md:grid-cols-2">
            <Image
              className="h-80 w-auto hidden md:block"
              src={completion}
              alt="Image Description"
            />
            <div>
              <h2 className="px-6 py-4 text-2xl font-semibold">
                O Level Completion Confirmation
              </h2>
              <div className="p-6">
                <p>
                  Excellent! As part of our university&apos;s requirement, we
                  need to confirm if you&apos;ve completed your O level
                  education. If you have, kindly select &apos;Yes&apos;. If not,
                  you may not be eligible to apply at this time. Don&apos;t be
                  disheartened; there are always opportunities awaiting you.
                  Click &apos;Next&apos; when you&apos;re prepared.
                </p>
                <div className="my-3">
                  <Select
                    onValueChange={(value: string) => {
                      setCompletedOLevel(value as "yes" | "no" | "");
                    }}
                    value={completedOLevel}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="O Level Completion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Have you finished O Level?</SelectLabel>
                        <SelectItem key="yes" value="yes">
                          Yes
                        </SelectItem>
                        <SelectItem key="no" value="no">
                          No
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentStep === 4 && (
          <div className="grid gap-8 md:grid-cols-2">
            <Image
              className="h-80 w-auto hidden md:block"
              src={globe}
              alt="Image Description"
            />
            <div>
              <h2 className="px-6 py-4 text-2xl font-semibold">
                Origin of Education
              </h2>
              <div className="p-6">
                <p>
                  Let&apos;s proceed! We require information about your
                  education background: whether you studied under Tanzania -
                  NECTA or Tanzania NECTA before 1988, or if you are a foreign
                  student. This allows us to customize your application process.
                  Kindly select the relevant option and click &apos;Next&apos;
                  to continue.
                </p>
                <div className="my-3">
                  <Select
                    onValueChange={(value: string) => {
                      handleApplicantOriginChange(value);
                    }}
                    value={selectedApplicantOrigin?.value || ""}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Origin of Education" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Choose Education Background</SelectLabel>
                        {applicantOrigins.map((applicantOrigin) => (
                          <SelectItem
                            key={applicantOrigin.value}
                            value={applicantOrigin.value}
                          >
                            {applicantOrigin.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentStep === 5 && (
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="px-6 py-4 text-2xl font-semibold">
                Highest Education Level
              </h2>
              <div className="p-6">
                <h2 className="font-semibold">
                  Now, let’s talk about your academic achievements!
                </h2>
                <p>
                  {`Considering your chosen application type (${selectedApplicationType?.label}), kindly select your highest level of education from the dropdown menu. This information is valuable in understanding your academic background. Every milestone in your educational journey holds significance. Once selected, click 'Next' to proceed.`}
                </p>
                <div className="my-3">
                  <Select
                    onValueChange={(value: string) => {
                      handleEducationChange(
                        selectedApplicationType?.value || "",
                        value
                      );
                    }}
                    value={selectedEducationLevel?.value || ""}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Education Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>
                          Select Your Highest Level of Education
                        </SelectLabel>
                        {getEducationLevels(
                          selectedApplicationType?.value || ""
                        ).map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <Image
              className="h-80 w-auto hidden md:block"
              src={education}
              alt="Image Description"
            />
          </div>
        )}
        {currentStep === 6 && (
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="px-6 py-4 text-2xl font-semibold">
                Form IV Index Number
              </h2>
              <div className="p-6">
                <p>
                  Let&apos;s proceed with registering your Form IV Index Number.
                  This identifier is unique and cannot be changed once
                  registered, so please double-check to ensure accuracy! Think
                  of it as your unique academic fingerprint. Click
                  &apos;Next&apos; when you&apos;re ready.
                </p>
              </div>
            </div>
            <div className="px-6">
              <Label>Form IV Index Number</Label>
              <Input
                onChange={(event) => setFormIVIndex(event.currentTarget.value)}
                value={formIVIndex}
                className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
              />
              <div className="mt-4 bg-blue-50 border border-blue-500 text-sm text-gray-500 rounded-lg p-5 dark:bg-blue-600/[.15]">
                <div className="flex">
                  <InfoCircledIcon className="flex-shrink-0 h-4 w-4 text-blue-600 mt-0.5 dark:text-white" />
                  <div className="ml-3">
                    <h3 className="text-blue-600 font-semibold dark:font-medium dark:text-white">
                      Form IV Index Format
                    </h3>
                    <p className="mt-2 text-gray-800 dark:text-slate-400">
                      The required format for Form IV Index is S0129/0001/2020
                      or P0199/0001/2020.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {currentStep === 7 && (
          <>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-white shadow-md dark:bg-gray-900">
                <h2 className="border-b border-gray-200 px-6 py-4 text-2xl font-semibold dark:border-gray-800">
                  Account Creation
                </h2>
                <div className="p-6">
                  <p>
                    Almost there! Now, let’s create your account. This will be
                    your gateway to complete the application process and beyond.
                    Please provide your contact information, including your
                    phone number and email address. Make sure they are both
                    correct as we will use them for all future communications.
                    Next, create a password for your account and confirm it.
                    Remember, your password should be strong and secure to
                    protect your account. Your username will be your Form IV
                    Index Number. This is to ensure uniqueness and easy recall.
                    Once you’ve filled in all the information, click ‘Create
                    Account’
                  </p>
                </div>
              </div>
              <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <Label>Form IV Index Number</Label>
                    <Input
                      readOnly
                      {...register("formIVIndex")}
                      type="text"
                      value={formIVIndex.trim()}
                      // label="Form IV Index "
                    />
                    {errors.formIVIndex?.message && (
                      <span className="flex items-center gap-x-1 text-red-600">
                        <ExclamationTriangleIcon className="flex-shrink-0 w-4 h-4" />
                        {errors.formIVIndex.message}
                      </span>
                    )}
                  </div>
                  <div className="my-6 grid gap-6 md:grid-cols-2">
                    <div>
                      <Label>Applicant First Name</Label>
                      <Input
                        {...register("firstName")}
                        type="text"
                        value={studentInformation.firstName}
                        placeholder="Enter First Name"
                      />
                      {errors.firstName?.message && (
                        <span className="flex items-center gap-x-1 text-red-600">
                          <ExclamationTriangleIcon className="flex-shrink-0 w-4 h-4" />
                          {errors.firstName.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <Label>Applicant Last Name</Label>
                      <Input
                        {...register("lastName")}
                        value={studentInformation.lastName}
                        type="text"
                        placeholder="Enter Last Name"
                      />

                      {errors.lastName?.message && (
                        <span className="flex items-center gap-x-1 text-red-600">
                          <ExclamationTriangleIcon className="flex-shrink-0 w-4 h-4" />
                          {errors.lastName.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <Label>Account Password</Label>
                      <div className="relative">
                        <Input
                          className="pr-10"
                          {...register("password")}
                          type={showPass ? "text" : "password"}
                          placeholder="Enter password"
                        />
                        <button
                          className="absolute h-full mx-4 top-0 end-0 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          type="button"
                          onClick={toggleShowPass}
                        >
                          {showPass ? (
                            <EyeOpenIcon className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-neutral-600" />
                          ) : (
                            <EyeClosedIcon className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-neutral-600" />
                          )}
                        </button>
                      </div>

                      {errors.password?.message && (
                        <span className="flex items-center gap-x-1 text-red-600">
                          <ExclamationTriangleIcon className="flex-shrink-0 w-4 h-4" />
                          {errors.password.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <Label>Confirm Account Password</Label>
                      <div className="relative">
                        <Input
                          {...register("confirmPassword")}
                          className="pr-10"
                          type={showConfirm ? "text" : "password"}
                          placeholder="Confirm Password"
                        />
                        <button
                          className="absolute h-full mx-4 top-0 end-0 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          type="button"
                          onClick={toggleConfirmPass}
                        >
                          {showConfirm ? (
                            <EyeOpenIcon className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-neutral-600" />
                          ) : (
                            <EyeClosedIcon className="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-neutral-600" />
                          )}
                        </button>
                      </div>

                      {errors.confirmPassword?.message && (
                        <span className="flex items-center gap-x-1 text-red-600">
                          <ExclamationTriangleIcon className="flex-shrink-0 w-4 h-4" />
                          {errors.confirmPassword.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <Label>Applicant Phone number</Label>
                      <Input
                        {...register("phone")}
                        type="text"
                        // label="Phone Number"
                        placeholder="Enter your phone Number"
                      />
                      {errors.phone?.message && (
                        <span className="flex items-center gap-x-1 text-red-600">
                          <ExclamationTriangleIcon className="flex-shrink-0 w-4 h-4" />
                          {errors.phone.message}
                        </span>
                      )}
                    </div>
                    <div>
                      <Label>Applicant Email Address</Label>
                      <Input
                        {...register("email")}
                        type="email"
                        // label="Email Address"
                        placeholder="Enter your Email Address"
                        // description="The email field is optional"
                      />

                      {errors.email?.message && (
                        <span className="flex items-center gap-x-1 text-red-600">
                          <ExclamationTriangleIcon className="flex-shrink-0 w-4 h-4" />
                          {errors.email.message}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Link href="/online_application">
                      <Button disabled={loading} color="danger">
                        Cancel Application
                      </Button>
                    </Link>
                    <Button disabled={loading} type="submit" color="success">
                      {loading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="my-4 flex w-full justify-end">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {loading && !errorMessage && (
          <div className="flex gap-3 text-blue-500">
            <span>
              Please hold on while we verify your Form IV index. We appreciate
              your patience.
            </span>{" "}
            <span className="loader inline-flex w-4 h-4 text-black dark:text-white"></span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div></div>
        <div className={`flex gap-x-2 ${isLastStep ? "hidden" : ""}`}>
          <Button
            color="primary"
            className={`${isFirstStep ? "hidden" : ""}`}
            onClick={handleBack}
            disabled={isFirstStep || loading}
          >
            Back
          </Button>
          <Button onClick={handleNext} disabled={loading} color="primary">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StepperForm;
