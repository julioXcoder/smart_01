"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Step } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FaAddressBook,
  FaBook,
  FaCreditCard,
  FaExclamation,
  FaList,
  FaPaperPlane,
  FaPaperclip,
  FaUser,
} from "react-icons/fa6";
import { MdOutlineAccessTime } from "react-icons/md";
import z from "zod";
import { FormSchema } from "./data";
import MobileNavigation from "./mobileNavigation";
import SideNavigation from "./sideNavigation";
import { ApplicationDetails } from "@/types/application";

import Attachments from "./attachments";
import Contacts from "./contacts";
import Education from "./education";
import EmergencyContact from "./emergencyContact";
import Payment from "./payment";
import Priorities from "./priorities";
import Profile from "./profile";

import { deleteApplicantProgrammePriority } from "@/server/actions/applicant";

interface Props {
  data: ApplicationDetails;
}

// const fakeProgrammes: ApplicantProgram[] = [
//   {
//     programmeCode: "P1",
//     priority: 0,
//     programmeDetails: {
//       name: "Programme 1",
//       level: "DIPLOMA",
//       language: "English",
//     },
//   },
//   {
//     programmeCode: "P2",
//     priority: 1,
//     programmeDetails: {
//       name: "Programme 2",
//       level: "DIPLOMA",
//       language: "English",
//     },
//   },
//   {
//     programmeCode: "P3",
//     priority: 2,
//     programmeDetails: {
//       name: "Programme 3",
//       level: "DIPLOMA",
//       language: "English",
//     },
//   },
// ];

const EditComponent = ({ data }: Props) => {
  const [step, setStep] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const [programmePriorities, setProgrammePriorities] = useState(
    data.programmePriorities,
  );
  const [applicantEducationBackground, setApplicantEducationBackground] =
    useState(data.applicantEducationBackground);
  const [applicantProfile, setApplicantProfile] = useState(
    data.applicantProfile,
  );
  const [applicantContacts, setApplicantContacts] = useState(
    data.applicantContacts,
  );
  const [applicantEmergencyContacts, setApplicantEmergencyContacts] = useState(
    data.applicantEmergencyContacts,
  );

  const [profileErrors, setProfileErrors] = useState(0);
  const [contactErrors, setContactErrors] = useState(0);
  const [emergencyContactErrors, setEmergencyContactErrors] = useState(0);
  const [educationErrors, setEducationErrors] = useState(0);

  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<String>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setIsLoading] = useState(false);

  useEffect(() => {
    const sortedProgrammes = data.programmePriorities.sort(
      (a, b) => a.priority - b.priority,
    );
    setProgrammePriorities(sortedProgrammes);
  }, [data]);

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

  useEffect(() => {
    console.log("Use Effect", programmePriorities);
  }, [programmePriorities]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: applicantProfile.firstName,
      middleName: applicantProfile.middleName,
      lastName: applicantProfile.lastName,
      nida: applicantProfile.nida,
      applicantEmail: applicantContacts.email || "",
      applicantPhoneNumber: applicantContacts.phone,
      citizenship: applicantProfile.nationality,
      country: applicantContacts.country,
      emergencyContactCity: applicantEmergencyContacts.city,
      emergencyContactCountry: applicantEmergencyContacts.country,
      emergencyContactEmail: applicantEmergencyContacts.email || "",
      emergencyContactPhoneNumber: applicantEmergencyContacts.phone,
      emergencyContactPostalCode: applicantEmergencyContacts.postalCode,
      emergencyContactRegion: applicantEmergencyContacts.region,
      emergencyContactRelation: applicantEmergencyContacts.relation,
      emergencyContactStreetAddress: applicantEmergencyContacts.streetAddress,
      city: applicantContacts.city,
      gender: applicantProfile.gender,
      region: applicantContacts.region,
      postalCode: applicantContacts.postalCode,
      streetAddress: applicantContacts.streetAddress,
      emergencyContactFullName: applicantEmergencyContacts.fullName,
      applicantAlternativeEmail: applicantContacts.alternativeEmail || "",
      applicantAlternativePhoneNumber:
        applicantContacts.alternativePhoneNumber || "",
      emergencyContactAlternativeEmail:
        applicantEmergencyContacts.alternativeEmail || "",
      emergencyContactAlternativePhoneNumber:
        applicantEmergencyContacts.alternativePhoneNumber || "",
      education: applicantEducationBackground,
    },
  });

  const moveUp = (index: number) => {
    setProgrammePriorities((prevProgrammes) => {
      const newProgrammes = [...prevProgrammes];
      if (index > 0) {
        [newProgrammes[index - 1], newProgrammes[index]] = [
          newProgrammes[index],
          newProgrammes[index - 1],
        ];
        newProgrammes[index - 1].priority = index - 1;
        newProgrammes[index].priority = index;
      }
      return newProgrammes;
    });
  };

  const moveDown = (index: number) => {
    setProgrammePriorities((prevProgrammes) => {
      const newProgrammes = [...prevProgrammes];
      if (index < newProgrammes.length - 1) {
        [newProgrammes[index + 1], newProgrammes[index]] = [
          newProgrammes[index],
          newProgrammes[index + 1],
        ];
        newProgrammes[index + 1].priority = index + 1;
        newProgrammes[index].priority = index;
      }
      return newProgrammes;
    });
  };

  // const deleteProgramme = (index: number) => {
  //   setProgrammePriorities((prevProgrammes) => {
  //     const newProgrammes = [...prevProgrammes];
  //     newProgrammes.splice(index, 1);
  //     // Update the priority of the remaining programmes
  //     for (let i = index; i < newProgrammes.length; i++) {
  //       newProgrammes[i].priority = i;
  //     }
  //     return newProgrammes;
  //   });
  // };

  const deleteProgramme = async (index: number) => {
    const prevProgrammes = programmePriorities;
    // Optimistically update the state
    setProgrammePriorities((prevProgrammes) => {
      const newProgrammes = [...prevProgrammes];
      newProgrammes.splice(index, 1);
      // Update the priority of the remaining programmes
      for (let i = index; i < newProgrammes.length; i++) {
        newProgrammes[i].priority = i;
      }
      return newProgrammes;
    });

    // Then perform the server operation
    const programmeToDelete = programmePriorities[index];
    const { data, error } =
      await deleteApplicantProgrammePriority(programmeToDelete);

    if (error) {
      toast.error(error, { duration: 6000 });
      setProgrammePriorities(prevProgrammes);
    } else if (data) {
      toast.success(data, { duration: 6000 });
    }
  };

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
    setEmergencyContactErrors(0);
    setEducationErrors(0);

    toast.success("Draft saved. Resume anytime.", {
      duration: 6000,
    });

    const educationArray = form.getValues("education");

    educationArray.forEach((item, index) => {
      form.setValue(`education.${index}.position`, index);
    });

    console.log("data", data);
    console.log("Education Errors", form.formState.errors.education);
  };

  const handleSubmitApplication = () => {
    const data = form.getValues();

    const validation = FormSchema.safeParse(data);

    setProfileErrors(0);
    setContactErrors(0);
    setEmergencyContactErrors(0);
    setEducationErrors(0);

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
        "applicantEmail",
        "applicantAlternativeEmail",
        "applicantPhoneNumber",
        "applicantAlternativePhoneNumber",
        "streetAddress",
        "city",
        "region",
        "postalCode",
        "country",
      ];
      const emergencyFields = [
        "emergencyContactFullName",
        "emergencyContactEmail",
        "emergencyContactPhoneNumber",
        "emergencyContactStreetAddress",
        "emergencyContactCity",
        "emergencyContactRegion",
        "emergencyContactPostalCode",
        "emergencyContactCountry",
        "emergencyContactRelation",
        "emergencyContactAlternativeEmail",
        "emergencyContactAlternativePhoneNumber",
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
      const emergencyContactFieldErrors = emergencyFields.filter(
        (field) =>
          validation.error.formErrors.fieldErrors[
            field as keyof typeof validation.error.formErrors.fieldErrors
          ],
      ).length;

      const educationErrors =
        validation.error.formErrors.fieldErrors.education?.length || 0;

      setProfileErrors(profileFieldErrors);
      setContactErrors(contactFieldErrors);
      setEmergencyContactErrors(emergencyContactFieldErrors);
      setEducationErrors(educationErrors);
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
      stepContent: (
        <Priorities
          applicantProgrammes={programmePriorities}
          onMoveUp={moveUp}
          onMoveDown={moveDown}
          onDelete={deleteProgramme}
        />
      ),
      Icon: FaList,
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
      Icon: FaUser,
    },
    {
      label: "Contacts",
      stepContent: <Contacts form={form} />,
      errors: contactErrors,
      Icon: FaAddressBook,
    },
    {
      label: "Emergency",
      stepContent: <EmergencyContact form={form} />,
      errors: emergencyContactErrors,
      Icon: FaExclamation,
    },
    {
      label: "Education",
      stepContent: <Education form={form} />,
      errors: educationErrors,
      Icon: FaBook,
    },
    {
      label: "Attachments",
      stepContent: <Attachments />,
      Icon: FaPaperclip,
    },
    {
      label: "Payments",
      stepContent: <Payment />,
      Icon: FaCreditCard,
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
            {currentStep.stepContent}

            <div className="mb-5 flex w-full items-center justify-center">
              <div>
                <MobileNavigation
                  step={step}
                  onGotoStep={handleGoToStep}
                  onNextStep={handleGoToNextStep}
                  onPrevStep={handleGoToPreviousStep}
                  steps={steps}
                />
              </div>
            </div>

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
