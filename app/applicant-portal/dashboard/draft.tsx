"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tab } from "@/types";
import { logError } from "@/utils/logger";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FaAddressBook,
  FaCreditCard,
  FaExclamation,
  FaGraduationCap,
  FaHouse,
  FaPaperPlane,
  FaUser,
} from "react-icons/fa6";
import { MdOutlineAccessTime } from "react-icons/md";
import { Programme } from "@prisma/client";
import z from "zod";
import Contacts from "./contacts";
import {
  ApplicantFormData,
  ApplicationData,
  EducationFileSchema,
  FormSchema,
  ImageSchema,
  ProgrammeWithDetails,
} from "./data";
import DraftTabs from "./draftTabs";
import Education from "./education";
import EmergencyContact from "./emergencyContact";
import Payment from "./payment";
import Priorities from "./priorities";
import Profile from "./profile";
import ProgrammeListing from "./programmeListing";

import { UploadFileResponse } from "@/types/uploadthing";
import { ApplicantFormalImage, ApplicantAdditionalFile } from "@prisma/client";
import {
  addApplicantAdditionalFile,
  addApplicantEducationFile,
  addApplicantImageData,
  deleteApplicantAdditionalFileData,
  deleteApplicantEducationFileData,
  deleteApplicantImageData,
  deleteApplicantProgramme,
  saveApplicationData,
  submitApplicantApplication,
  addApplicantProgrammePriority,
} from "./actions";

interface Props {
  data: ApplicationData;
}

const Draft = ({ data }: Props) => {
  const {
    details: {
      firstName,
      alternativeEmail,
      alternativePhone,
      city,
      country,
      dateOfBirth,
      email,
      disability,
      controlNumber,
      emergencyAlternativeEmail,
      emergencyCity,
      emergencyCountry,
      emergencyEmail,
      emergencyFullName,
      emergencyPhone,
      emergencyPostalCode,
      emergencyAlternativePhone,
      emergencyRegion,
      emergencyStreetAddress,
      gender,
      lastName,
      maritalStatus,
      middleName,
      nationality,
      nida,
      phone,
      placeOfBirth,
      postalCode,
      region,
      streetAddress,
      paymentStatus,
      emergencyRelation,
    },
    formalImage,
    educationFile,
    applicantProgrammePriorities,
    additionalEducationFiles,
    applicantEducationBackgrounds: education,
    programmeList,
  } = data;

  const [isSaved, setIsSaved] = useState(true);
  const [showProgrammes, setShowProgrammes] = useState(false);
  const [programmePriorities, setProgrammePriorities] = useState(
    applicantProgrammePriorities,
  );
  const [programmePrioritiesErrorMessage, setProgrammePrioritiesErrorMessage] =
    useState("");

  const [imageErrorMessage, setImageErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(
    formalImage.imageUrl,
  );
  const [draftSaving, setDraftSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setIsUploadingImage] = useState(false);
  const [uploadingFile, setIsUploadingFile] = useState(false);

  useEffect(() => {
    const initialState = {
      programmePriorities: applicantProgrammePriorities,
    };

    const currentState = {
      programmePriorities,
    };

    if (isEqual(initialState, currentState)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [applicantProgrammePriorities, programmePriorities]);

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
      firstName,
      middleName,
      lastName,
      nida,
      disability,
      maritalStatus,
      dateOfBirth,
      placeOfBirth,
      email: email || "",
      phone,
      nationality,
      country,
      emergencyCity,
      emergencyCountry,
      emergencyEmail: emergencyEmail || "",
      emergencyPhone,
      emergencyPostalCode,
      emergencyRegion,
      emergencyRelation,
      emergencyStreetAddress,
      city,
      gender,
      region,
      postalCode,
      streetAddress,
      emergencyFullName,
      alternativeEmail: alternativeEmail || "",
      alternativePhone: alternativePhone || "",
      emergencyAlternativeEmail: emergencyAlternativeEmail || "",
      emergencyAlternativePhone: emergencyAlternativePhone || "",
      education,
    },
  });

  const currentFormValues = useWatch({ control: form.control });

  useEffect(() => {
    const initialState = {
      firstName,
      middleName,
      lastName,
      nida,
      email,
      phone,
      nationality,
      country,
      disability,
      placeOfBirth,
      dateOfBirth,
      maritalStatus,
      emergencyCity,
      emergencyCountry,
      emergencyEmail,
      emergencyPhone,
      emergencyPostalCode,
      emergencyRegion,
      emergencyRelation,
      emergencyStreetAddress,
      city,
      gender,
      region,
      postalCode,
      streetAddress,
      emergencyFullName,
      alternativeEmail,
      alternativePhone,
      emergencyAlternativeEmail,
      emergencyAlternativePhone,
      education,
    };

    if (isEqual(initialState, currentFormValues)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [
    alternativeEmail,
    alternativePhone,
    city,
    country,
    currentFormValues,
    dateOfBirth,
    disability,
    education,
    email,
    emergencyAlternativeEmail,
    emergencyAlternativePhone,
    emergencyCity,
    emergencyCountry,
    emergencyEmail,
    emergencyFullName,
    emergencyPhone,
    emergencyPostalCode,
    emergencyRegion,
    emergencyRelation,
    emergencyStreetAddress,
    firstName,
    gender,
    lastName,
    maritalStatus,
    middleName,
    nationality,
    nida,
    phone,
    placeOfBirth,
    postalCode,
    region,
    streetAddress,
  ]);

  // Priorities

  const addProgramme = useCallback(
    async (programme: ProgrammeWithDetails) => {
      const hasDuplicateProgrammeCode = programmePriorities.some(
        (programmePriority) =>
          programmePriority.programmeCode === programme.code,
      );

      if (hasDuplicateProgrammeCode) {
        toast.error("Programme already added. Please pick a different one.", {
          duration: 6000,
        });
        return;
      }

      const programmesLength = programmePriorities.length;

      if (programmesLength >= 5) {
        toast.error("Max programmes reached you cant add anymore programmes.", {
          duration: 6000,
        });
        return;
      }

      // Optimistically update the state
      const tempId = (programmePriorities.length + 1).toString(); // Generate a temporary ID based on the

      setProgrammePriorities((prevProgrammes) => [
        ...prevProgrammes,
        {
          id: tempId,
          programmeCode: programme.code,
          priority: prevProgrammes.length + 1,
          programme,
        },
      ]);

      setShowProgrammes(false);

      // Then perform the server operation
      const responsePromise = addApplicantProgrammePriority(
        programme.code,
        programmesLength + 1,
      );

      toast.promise(responsePromise, {
        loading: "Adding programme...",
        success: <b>Programme added!</b>,
        error: <b>Unfortunately, the programme could not be added.</b>,
      });

      const newProgramme = await responsePromise.catch((error) => {
        // If the server operation fails, revert the optimistic update
        setProgrammePriorities((prevProgrammes) =>
          prevProgrammes.filter((programme) => programme.id !== tempId),
        );
        logError(error);
      });

      if (newProgramme) {
        setProgrammePriorities((prevProgrammes) =>
          prevProgrammes.map((programme) =>
            programme.id === tempId
              ? { ...programme, id: newProgramme.id }
              : programme,
          ),
        );
      }
    },
    [programmePriorities],
  );

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

      const responsePromise = deleteApplicantProgramme(programmeToDelete.id);

      toast.promise(responsePromise, {
        loading: "deleting programme...",
        success: <b>Programme deleted!</b>,
        error: <b>Unfortunately, the programme could not be deleted.</b>,
      });

      await responsePromise.catch((error) => {
        setProgrammePriorities(prevProgrammes);
        logError(error);
      });
    },
    [programmePriorities],
  );
  // Priorities

  // Profile

  const handleImageUpload = useCallback(
    async (file: File, method: string, imageData?: any) => {
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
        success: <b>Image processed!</b>,
        error: <b>Could not process the image.</b>,
      });

      const response = await responsePromise;

      if (!response.ok) {
        toast.error("failed to process the image", { duration: 6000 });
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
    },
    [],
  );

  const handleImageChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files ? event.target.files[0] : null;
      setImageErrorMessage("");

      if (file) {
        const imageValidation = ImageSchema.safeParse({ image: file });

        if (!imageValidation.success) {
          toast.error(imageValidation.error.errors[0].message, {
            duration: 6000,
          });
          return;
        }

        const url = URL.createObjectURL(file);
        setImagePreview(url);
        setIsUploadingImage(true);
        const prevImage = imagePreview;

        let success;
        if (formalImage.key) {
          success = await handleImageUpload(file, "PUT", formalImage);
        } else {
          success = await handleImageUpload(file, "POST");
        }

        if (!success) {
          setImagePreview(prevImage);
        }
      }

      event.target.value = "";
      setIsUploadingImage(false);
    },
    [formalImage, handleImageUpload, imagePreview],
  );

  const handleImageRemoval = useCallback(
    async (imageData: ApplicantFormalImage) => {
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
        success: <b>Image processed!</b>,
        error: <b>Could not remove the image.</b>,
      });

      const response = await responsePromise;

      if (!response.ok) {
        toast.error("failed to process the image", { duration: 6000 });
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
    },
    [],
  );

  const handleFileRemove = useCallback(async () => {
    const prevImagePreView = imagePreview;
    setIsUploadingImage(true);
    setImagePreview(null);
    setImageErrorMessage("");

    if (formalImage) {
      const success = await handleImageRemoval(formalImage);

      if (!success) {
        setImagePreview(prevImagePreView);
      }
    }

    setIsUploadingImage(false);
  }, [formalImage, handleImageRemoval, imagePreview]);

  // Profile

  // Education

  const handleEducationFileRemoval = useCallback(async (key: string) => {
    const formData = new FormData();

    formData.append("key", key);

    const responsePromise = fetch("/api/applicant/file", {
      method: "DELETE",
      body: formData,
    });

    toast.promise(responsePromise, {
      loading: "Removing file...",
      success: <b>File processed!</b>,
      error: <b>Could not remove the file.</b>,
    });

    const response = await responsePromise;

    if (!response.ok) {
      toast.error("failed to process the file", { duration: 6000 });
      return false;
    }

    const success: boolean = await response.json();

    if (success) {
      toast.promise(deleteApplicantEducationFileData(), {
        loading: "Removing file...",
        success: <b>File removed.</b>,
        error: <b>Oops failed to remove file</b>,
      });
      return true;
    } else {
      toast.error("File removal failed!", { duration: 6000 });
      return false;
    }
  }, []);

  const handleEducationFileRemove = useCallback(async () => {
    if (additionalEducationFiles.length > 0) {
      toast.error(
        "Please delete additional files before deleting the main file.",
        { duration: 6000 },
      );

      return;
    }

    setIsUploadingFile(true);

    if (educationFile.key) {
      const success = await handleEducationFileRemoval(educationFile.key);
    }

    setIsUploadingFile(false);
  }, [
    additionalEducationFiles.length,
    educationFile.key,
    handleEducationFileRemoval,
  ]);

  const handleEducationFileUpload = useCallback(
    async (file: File, method: string, fileData?: any) => {
      const formData = new FormData();
      formData.append("file", file);

      if (fileData) {
        for (let key in fileData) {
          if (Object.prototype.hasOwnProperty.call(fileData, key)) {
            const element = fileData[key as keyof typeof fileData];
            formData.append(key, String(element));
          }
        }
      }

      const responsePromise = fetch("/api/applicant/file", {
        method,
        body: formData,
      });

      toast.promise(responsePromise, {
        loading: `${method === "PUT" ? "Updating" : "Uploading"} file...`,
        success: <b>File processed!</b>,
        error: <b>Could not process the file.</b>,
      });

      const response = await responsePromise;

      if (!response.ok) {
        toast.error("failed to process the file", { duration: 6000 });
        return false;
      }

      const uploadedFile: UploadFileResponse = await response.json();
      const { data: fileDataResponse, error } = uploadedFile;

      if (fileDataResponse) {
        toast.promise(addApplicantEducationFile(fileDataResponse, file.type), {
          loading: "Saving file...",
          success: <b>File saved.</b>,
          error: <b>Oops failed to save file</b>,
        });
        return true;
      } else if (error) {
        toast.error("File upload failed!", { duration: 6000 });
        return false;
      }
    },
    [],
  );

  const handleEducationFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files ? event.target.files[0] : null;

      if (file) {
        const fileValidation = EducationFileSchema.safeParse({ file });

        if (!fileValidation.success) {
          toast.error(fileValidation.error.errors[0].message, {
            duration: 6000,
          });
          return;
        }

        setIsUploadingFile(true);

        let success;
        if (educationFile.key) {
          success = await handleEducationFileUpload(file, "PUT", educationFile);
        } else {
          success = await handleEducationFileUpload(file, "POST");
        }
      }

      event.target.value = "";
      setIsUploadingFile(false);
    },
    [educationFile, handleEducationFileUpload],
  );

  const handleAdditionalFileRemove = useCallback(
    async (file: ApplicantAdditionalFile) => {
      setIsUploadingFile(true);

      const formData = new FormData();

      formData.append("key", file.key);

      const responsePromise = fetch("/api/applicant/file", {
        method: "DELETE",
        body: formData,
      });

      toast.promise(responsePromise, {
        loading: "Removing file...",
        success: <b>File processed!</b>,
        error: <b>Could not remove the file.</b>,
      });

      const response = await responsePromise;

      if (!response.ok) {
        toast.error("failed to process the file", { duration: 6000 });
        setIsUploadingFile(false);
        return;
      }

      const success: boolean = await response.json();

      if (success) {
        toast.promise(deleteApplicantAdditionalFileData(file.id), {
          loading: "Removing file...",
          success: <b>File removed.</b>,
          error: <b>Oops failed to remove file</b>,
        });
      } else {
        toast.error("File removal failed!", { duration: 6000 });
      }

      setIsUploadingFile(false);
    },
    [],
  );

  const handleAdditionalFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const formData = new FormData();
      const file = event.target.files ? event.target.files[0] : null;

      if (file) {
        const fileValidation = EducationFileSchema.safeParse({ file });

        if (!fileValidation.success) {
          toast.error(fileValidation.error.errors[0].message, {
            duration: 6000,
          });
          return;
        }

        setIsUploadingFile(true);
        formData.append("file", file);

        const responsePromise = fetch("/api/applicant/file", {
          method: "POST",
          body: formData,
        });

        toast.promise(responsePromise, {
          loading: "Uploading file...",
          success: <b>File processed!</b>,
          error: <b>Could not process the file.</b>,
        });

        const response = await responsePromise;

        if (!response.ok) {
          toast.error("failed to process the image", { duration: 6000 });
          event.target.value = "";
          setIsUploadingFile(false);
          return;
        }

        const uploadedFile: UploadFileResponse = await response.json();
        const { data: fileDataResponse, error } = uploadedFile;

        if (fileDataResponse) {
          toast.promise(
            addApplicantAdditionalFile(fileDataResponse, file.type),
            {
              loading: "Saving file...",
              success: <b>File saved.</b>,
              error: <b>Oops failed to save file</b>,
            },
          );
        } else if (error) {
          toast.error("File upload failed!", { duration: 6000 });
        }
      }

      event.target.value = "";
      setIsUploadingFile(false);
    },
    [],
  );

  // Education

  const handleShowProgrammeListing = () => {
    setShowProgrammes(true);
  };

  const handleCloseProgrammeListing = () => {
    setShowProgrammes(false);
  };

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

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);

    try {
      await handleSaveAsDraft({ successText: "Saved" });
    } catch (error) {
      setIsSubmitting(false);
      return;
    }

    const responsePromise = submitApplicantApplication();

    toast.promise(responsePromise, {
      loading: "Your application is being processed. Please wait...",
      success: (
        <b>
          Your application is successfully submitted and under review. Stay
          tuned!
        </b>
      ),
      error: (
        <b>
          Oops! Something went wrong while submitting your application. Please
          try again.
        </b>
      ),
    });

    await responsePromise.catch((error) => {
      logError(error);
      setIsSubmitting(false);
    });
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
    setDraftSaving(true);
    const formData = form.getValues();
    clearAllErrors();

    const applicantPriorities = reorderPriorities();

    const educationArray = formData.education;

    educationArray.forEach((item, index) => {
      form.setValue(`education.${index}.position`, index);
    });

    const applicantFormData: ApplicantFormData = {
      formData,
      applicantProgrammes: applicantPriorities,
    };

    const responsePromise = saveApplicationData(applicantFormData);

    toast.promise(responsePromise, {
      loading: `${loadingText}`,
      success: <b>{successText}</b>,
      error: <b>{errorText}</b>,
    });

    await responsePromise.catch((error) => {
      logError(error);

      throw error;
    });
    setDraftSaving(false);
  };

  const handleSubmitApplication = async () => {
    const applicationFormValues = form.getValues();

    clearAllErrors();

    const validation = FormSchema.safeParse(applicationFormValues);

    if (!validation.success) {
      toast.error(
        "Oops! Some fields are incomplete. Please review and fill all required fields.",
        { duration: 6000 },
      );
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
    if (!formalImage.imageUrl) {
      setImageErrorMessage("Image is required.");
    }

    // If either condition is not met, return early
    if (programmePriorities.length < 3 || !formalImage.imageUrl) {
      return;
    }

    await form.handleSubmit(onSubmit)();
  };

  const clearAllErrors = () => {
    form.clearErrors();
    setProgrammePrioritiesErrorMessage("");
    setImageErrorMessage("");
  };

  const tabs: Tab[] = [
    {
      label: "priorities",
      Icon: FaHouse,
      content: (
        <Priorities
          draftSaving={draftSaving}
          isSubmitting={isSubmitting}
          applicantProgrammes={programmePriorities}
          onMoveUp={moveUp}
          openListing={handleShowProgrammeListing}
          programmePrioritiesErrorMessage={programmePrioritiesErrorMessage}
          onMoveDown={moveDown}
          onDelete={deleteProgramme}
        />
      ),
    },
    {
      label: "profile",
      Icon: FaUser,
      content: (
        <Profile
          draftSaving={draftSaving}
          isSubmitting={isSubmitting}
          applicantImageData={formalImage}
          imagePreview={imagePreview}
          onImageDelete={handleFileRemove}
          imageErrorMessage={imageErrorMessage}
          onImageUpdate={handleImageChange}
          uploadingImage={uploadingImage}
          form={form}
        />
      ),
    },
    {
      label: "contacts",
      Icon: FaAddressBook,
      content: (
        <Contacts
          draftSaving={draftSaving}
          isSubmitting={isSubmitting}
          form={form}
        />
      ),
    },
    {
      label: "emergency",
      Icon: FaExclamation,
      content: (
        <EmergencyContact
          draftSaving={draftSaving}
          isSubmitting={isSubmitting}
          form={form}
        />
      ),
    },
    {
      label: "education",
      Icon: FaGraduationCap,
      content: (
        <Education
          draftSaving={draftSaving}
          isSubmitting={isSubmitting}
          applicantEducationFileData={educationFile}
          onFileUpdate={handleEducationFileChange}
          applicantAdditionalFileData={additionalEducationFiles}
          onFileRemove={handleEducationFileRemove}
          onAdditionalFileUpdate={handleAdditionalFileChange}
          onAdditionalFileRemove={handleAdditionalFileRemove}
          applicantHighestEducation={data.highestEducationLevel}
          uploadingFile={uploadingFile}
          form={form}
        />
      ),
    },
    {
      content: (
        <Payment
          draftSaving={draftSaving}
          isSubmitting={isSubmitting}
          controlNumber={controlNumber}
          paymentStatus={paymentStatus}
        />
      ),
      label: "payments",
      Icon: FaCreditCard,
    },
  ];

  return (
    <div className="w-full">
      {showProgrammes ? (
        <ProgrammeListing
          programmes={programmeList}
          handleAddApplicantProgramme={addProgramme}
          closeListing={handleCloseProgrammeListing}
        />
      ) : (
        <>
          <Form {...form}>
            <DraftTabs tabs={tabs} />
          </Form>

          <div className="w-full">
            <Button
              className="mt-2 w-full"
              variant="secondary"
              onClick={() => handleSaveAsDraft({})}
              disabled={isSubmitting || draftSaving}
            >
              <span className="flex items-center gap-2">
                <MdOutlineAccessTime className="h-4 w-4 shrink-0" />
                Save as Draft
              </span>
            </Button>

            <AlertDialog>
              <AlertDialogTrigger
                disabled={isSubmitting || draftSaving}
                asChild
              >
                <Button className="mt-2 w-full">
                  <span className="flex items-center gap-2">
                    <FaPaperPlane className="h-4 w-4 shrink-0" />
                    Submit Application
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {paymentStatus === "SUCCESS" ? (
                      <>Application Submission Confirmation</>
                    ) : (
                      <> Payment Required</>
                    )}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {paymentStatus === "SUCCESS" ? (
                      <>
                        {" "}
                        Please review your information carefully before
                        submitting. Are you sure all the information is correct?
                      </>
                    ) : (
                      <>
                        Please complete your payment of 10,000 Tanzanian
                        Shillings before proceeding with your application. Thank
                        you.
                      </>
                    )}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>
                    {paymentStatus === "SUCCESS" ? (
                      <>Review Again</>
                    ) : (
                      <>Close</>
                    )}
                  </AlertDialogCancel>
                  {paymentStatus === "SUCCESS" && (
                    <AlertDialogAction onClick={handleSubmitApplication}>
                      Confirm and Submit
                    </AlertDialogAction>
                  )}
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </>
      )}
    </div>
  );
};

export default Draft;
