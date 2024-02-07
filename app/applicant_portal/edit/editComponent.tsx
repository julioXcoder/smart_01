"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Step } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChangeEvent,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useForm, useWatch } from "react-hook-form";
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
import { FormSchema, ImageSchema } from "./data";
import MobileNavigation from "./mobileNavigation";
import SideNavigation from "./sideNavigation";
import { isEqual } from "lodash";
import {
  ApplicantImageData,
  ApplicantProgram,
  ApplicationDetails,
} from "@/types/application";
import { ApplicantFormData } from "@/server/actions/applicant/schema";
import { UploadFileResponse } from "@/types/uploadthing";

import Attachments from "./attachments";
import Contacts from "./contacts";
import Education from "./education";
import EmergencyContact from "./emergencyContact";
import Payment from "./payment";
import Priorities from "./priorities";
import Profile from "./profile";

import {
  deleteApplicantProgrammePriority,
  saveApplicationData,
  addApplicantImageData,
} from "@/server/actions/applicant";

interface Props {
  data: ApplicationDetails;
}

const EditComponent = ({ data }: Props) => {
  const [step, setStep] = useState(0);
  const [isSaved, setIsSaved] = useState(true);

  const [programmePriorities, setProgrammePriorities] = useState(
    data.programmePriorities,
  );

  const [programmePrioritiesErrorMessage, setProgrammePrioritiesErrorMessage] =
    useState("");

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
  const [imageErrorMessage, setImageErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(
    data.applicantImageData.imageUrl,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setIsLoading] = useState(false);
  const [uploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    const sortedProgrammes = data.programmePriorities.sort(
      (a, b) => a.priority - b.priority,
    );
    setProgrammePriorities(sortedProgrammes);
  }, [data]);

  useEffect(() => {
    const initialState = {
      programmePriorities: data.programmePriorities,
    };

    const currentState = {
      programmePriorities,
    };

    if (isEqual(initialState, currentState)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [
    programmePriorities,
    applicantEducationBackground,
    data.programmePriorities,
    data.applicantEducationBackground,
    imagePreview,
  ]);

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
      education: applicantEducationBackground.length
        ? applicantEducationBackground
        : [
            {
              position: 0,
              level: "",
              schoolName: "",
              startYear: "",
              endYear: "",
            },
          ],
    },
  });

  const currentFormValues = useWatch({ control: form.control });

  useEffect(() => {
    const initialState = {
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
      education: applicantEducationBackground.length
        ? applicantEducationBackground
        : [
            {
              position: 0,
              level: "",
              schoolName: "",
              startYear: "",
              endYear: "",
            },
          ],
    };

    if (isEqual(initialState, currentFormValues)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [
    applicantContacts.alternativeEmail,
    applicantContacts.alternativePhoneNumber,
    applicantContacts.city,
    applicantContacts.country,
    applicantContacts.email,
    applicantContacts.phone,
    applicantContacts.postalCode,
    applicantContacts.region,
    applicantContacts.streetAddress,
    applicantEducationBackground,
    applicantEmergencyContacts.alternativeEmail,
    applicantEmergencyContacts.alternativePhoneNumber,
    applicantEmergencyContacts.city,
    applicantEmergencyContacts.country,
    applicantEmergencyContacts.email,
    applicantEmergencyContacts.fullName,
    applicantEmergencyContacts.phone,
    applicantEmergencyContacts.postalCode,
    applicantEmergencyContacts.region,
    applicantEmergencyContacts.relation,
    applicantEmergencyContacts.streetAddress,
    applicantProfile.firstName,
    applicantProfile.gender,
    applicantProfile.lastName,
    applicantProfile.middleName,
    applicantProfile.nationality,
    applicantProfile.nida,
    currentFormValues,
    form,
  ]);

  const moveUp = useCallback(
    (index: number) => {
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

        const sortedProgrammes = newProgrammes.sort(
          (a, b) => a.priority - b.priority,
        );

        for (let i = 0; i < sortedProgrammes.length; i++) {
          sortedProgrammes[i].priority = i + 1;
        }

        return sortedProgrammes;
      });
    },
    [setProgrammePriorities],
  );

  const moveDown = useCallback(
    (index: number) => {
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

        const sortedProgrammes = newProgrammes.sort(
          (a, b) => a.priority - b.priority,
        );

        for (let i = 0; i < sortedProgrammes.length; i++) {
          sortedProgrammes[i].priority = i + 1;
        }

        return sortedProgrammes;
      });
    },
    [setProgrammePriorities],
  );

  const deleteProgramme = useCallback(
    async (index: number) => {
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
    },
    [programmePriorities],
  );

  const handleImageUpload = async (
    file: File,
    method: string,
    imageData?: any,
  ) => {
    const formData = new FormData();
    formData.append("imageFile", file);

    if (imageData) {
      for (let key in imageData) {
        if (Object.prototype.hasOwnProperty.call(imageData, key)) {
          const element = imageData[key as keyof typeof imageData];
          formData.append(key, String(element));
        }
      }
    }

    const responsePromise = fetch("/api/applicant/image", {
      method,
      body: formData,
    });

    toast.promise(responsePromise, {
      loading: `${method === "PUT" ? "Updating" : "Uploading"} image...`,
      success: <b>Image processed successfully!</b>,
      error: <b>Could not process the image.</b>,
    });

    const response = await responsePromise;

    if (!response.ok) {
      return false;
    }

    const uploadedImage: UploadFileResponse = await response.json();
    const { data: imageDataResponse, error } = uploadedImage;

    if (imageDataResponse) {
      toast.promise(addApplicantImageData(imageDataResponse), {
        loading: "Saving image...",
        success: <b>Image saved.</b>,
        error: <b>Oops failed to save image</b>,
      });
      return true;
    } else if (error) {
      toast.error("Image upload failed!", { duration: 6000 });
      return false;
    }
  };

  const handleImageChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files ? event.target.files[0] : null;

      if (file) {
        const imageValidation = ImageSchema.safeParse({ image: file });

        if (!imageValidation.success) {
          toast.error(imageValidation.error.errors[0].message, {
            duration: 6000,
          });
          return;
        }

        setImage(file);
        const url = URL.createObjectURL(file);
        setImagePreview(url);
        setIsUploadingImage(true);

        let success;
        if (data.applicantImageData.key) {
          success = await handleImageUpload(
            file,
            "PUT",
            data.applicantImageData,
          );
        } else {
          success = await handleImageUpload(file, "POST");
        }

        if (!success) {
          setImagePreview(null);
        }
      }

      event.target.value = "";
      setIsUploadingImage(false);
    },
    [data.applicantImageData],
  );

  // const handleFileRemove = useCallback(async () => {
  //   const formData = new FormData();
  //   const prevImagePreView = imagePreview;
  //   setIsUploadingImage(true);
  //   setImage(null);
  //   setImagePreview(null);

  //   if (data.applicantImageData) {
  //     // FIXME: update image pass imageUrl and image file

  //     for (let key in data.applicantImageData) {
  //       if (
  //         Object.prototype.hasOwnProperty.call(data.applicantImageData, key)
  //       ) {
  //         const element =
  //           data.applicantImageData[
  //             key as keyof typeof data.applicantImageData
  //           ];
  //         formData.append(key, String(element));
  //       }
  //     }

  //     const responsePromise = fetch("/api/applicant/image", {
  //       method: "DELETE",
  //       body: formData,
  //     });

  //     toast.promise(responsePromise, {
  //       loading: "removing image...",
  //       success: <b>Image processed successfully!</b>,
  //       error: <b>Could not process the image.</b>,
  //     });

  //     const response = await responsePromise;

  //     if (!response.ok) {
  //       setImagePreview(prevImagePreView);
  //       setIsUploadingImage(false)
  //       return
  //     }

  //     const success:boolean= await response.json();

  //     if (success) {
  //       toast.promise(deleteApplicantImageData(), {
  //         loading: "Removing image...",
  //         success: <b>Image removed.</b>,
  //         error: <b>Oops failed to remove image</b>,
  //       });
  //       return true;
  //     } else {
  //       toast.error("Image remove failed!", { duration: 6000 });
  //       setImagePreview(prevImagePreView);
  //       setIsUploadingImage(false)
  //       return
  //     }
  //   }

  //   setIsUploadingImage(false);
  // }, [data, imagePreview]);

  // Helper function to handle image removal
  const handleImageRemoval = async (imageData: ApplicantImageData) => {
    const formData = new FormData();

    for (let key in imageData) {
      if (Object.prototype.hasOwnProperty.call(imageData, key)) {
        const element = imageData[key as keyof typeof imageData];
        formData.append(key, String(element));
      }
    }

    const responsePromise = fetch("/api/applicant/image", {
      method: "DELETE",
      body: formData,
    });

    toast.promise(responsePromise, {
      loading: "Removing image...",
      success: <b>Image removed successfully!</b>,
      error: <b>Could not remove the image.</b>,
    });

    const response = await responsePromise;

    if (!response.ok) {
      return false;
    }

    const success: boolean = await response.json();

    if (success) {
      toast.promise(deleteApplicantImageData(), {
        loading: "Removing image...",
        success: <b>Image removed.</b>,
        error: <b>Oops failed to remove image</b>,
      });
      return true;
    } else {
      toast.error("Image removal failed!", { duration: 6000 });
      return false;
    }
  };

  const handleFileRemove = useCallback(async () => {
    const prevImagePreView = imagePreview;
    setIsUploadingImage(true);
    setImage(null);
    setImagePreview(null);

    if (data.applicantImageData) {
      const success = await handleImageRemoval(data.applicantImageData);

      if (!success) {
        setImagePreview(prevImagePreView);
      }
    }

    setIsUploadingImage(false);
  }, [data, imagePreview]);

  const steps: Step[] = useMemo(
    () => [
      {
        label: "Priorities",
        stepContent: (
          <Priorities
            applicantProgrammes={programmePriorities}
            onMoveUp={moveUp}
            programmePrioritiesErrorMessage={programmePrioritiesErrorMessage}
            onMoveDown={moveDown}
            onDelete={deleteProgramme}
          />
        ),
        Icon: FaList,
        errors: programmePrioritiesErrorMessage !== "" ? 1 : 0,
      },
      {
        label: "Profile",
        stepContent: (
          <Profile
            applicantImageData={data.applicantImageData}
            imagePreview={imagePreview}
            onImageDelete={handleFileRemove}
            imageErrorMessage={imageErrorMessage}
            onImageUpdate={handleImageChange}
            uploadingImage={uploadingImage}
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
    ],
    [
      programmePriorities,
      moveUp,
      programmePrioritiesErrorMessage,
      moveDown,
      deleteProgramme,
      data.applicantImageData,
      imagePreview,
      handleFileRemove,
      imageErrorMessage,
      handleImageChange,
      uploadingImage,
      form,
      profileErrors,
      contactErrors,
      emergencyContactErrors,
      educationErrors,
    ],
  );

  const handleGoToNextStep = useCallback(() => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    }
  }, [step, steps]);

  const handleGoToPreviousStep = useCallback(() => {
    if (step > 0) {
      setStep(step - 1);
    }
  }, [step]);

  const handleGoToStep = useCallback((stepIndex: number) => {
    setStep(stepIndex);
  }, []);

  const reorderPriorities = () => {
    const prevProgrammes = [...programmePriorities];

    const sortedProgrammes = [...prevProgrammes].sort(
      (a, b) => a.priority - b.priority,
    );

    for (let i = 0; i < sortedProgrammes.length; i++) {
      sortedProgrammes[i].priority = i + 1;
    }

    return sortedProgrammes;
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    handleSaveAsDraft({});

    toast.success(
      "Your application is successfully submitted and under review. Stay tuned!",
      {
        duration: 6000,
      },
    );
  }

  const handleSaveAsDraft = async ({
    successText = "Draft saved. Resume anytime.",
    errorText = "Oops! There was an error saving your draft.",
    loadingText = "Saving...",
  }: {
    successText?: string;
    errorText?: string;
    loadingText?: string;
  }) => {
    const formData = form.getValues();
    clearAllErrors();

    const educationArray = form.getValues("education");

    educationArray.forEach((item, index) => {
      form.setValue(`education.${index}.position`, index);
    });

    const applicantPriorities = reorderPriorities();

    const applicantFormData: ApplicantFormData = {
      formData,
      applicantProgrammes: applicantPriorities,
    };

    // const { data: response, error } =
    //   await saveApplicationData(applicantFormData);

    toast.promise(saveApplicationData(applicantFormData), {
      loading: `${loadingText}`,
      success: <b>{successText}</b>,
      error: <b>{errorText}</b>,
    });

    // if(error){

    // } else if(response){

    //   setIsSaved(true);
    // }
  };

  const handleSubmitApplication = () => {
    const data = form.getValues();

    clearAllErrors();
    let totalProfileErrors = 0;

    const validation = FormSchema.safeParse(data);

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

      totalProfileErrors += profileFieldErrors;

      setProfileErrors(profileFieldErrors);
      setContactErrors(contactFieldErrors);
      setEmergencyContactErrors(emergencyContactFieldErrors);
      setEducationErrors(educationErrors);
    }
    if (programmePriorities.length < 3) {
      toast.error("Oops! Please select at least three programmes.", {
        duration: 6000,
      });

      setProgrammePrioritiesErrorMessage(
        "We need at least three programmes to understand your preferences better. Could you please select more? Thanks!",
      );
    }

    // Check if the image is not provided
    if (!image) {
      setImageErrorMessage("Image is required.");
      totalProfileErrors += 1;
      setProfileErrors(totalProfileErrors);
    }

    // If either condition is not met, return early
    if (programmePriorities.length < 3 || !image) {
      return;
    }

    form.handleSubmit(onSubmit)();
  };

  const clearAllErrors = () => {
    form.clearErrors();
    setProfileErrors(0);
    setContactErrors(0);
    setEmergencyContactErrors(0);
    setEducationErrors(0);
    setProgrammePrioritiesErrorMessage("");
    setImageErrorMessage("");
  };

  const currentStep = steps[step];

  return (
    <div>
      <div>is Saved: {JSON.stringify(isSaved)}</div>
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
              onClick={() => handleSaveAsDraft({})}
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
