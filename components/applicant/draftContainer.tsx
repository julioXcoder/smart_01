"use client";

import BottomNavigation from "@/components/bottomNavigation";
import DraftSidebar from "@/components/applicant/draftSidebar";
import MainContent from "@/components/layout/mainContent";
import { Tab } from "@/types";
import {
  FaInbox,
  FaCreditCard,
  FaGear,
  FaMagnifyingGlass,
} from "react-icons/fa6";

import Draft from "./draft";
import Programmes from "./programmes";
import Payment from "./payment";
import Settings from "./settings";
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
import { logError } from "@/utils/logger";

import { UploadFileResponse } from "@/types/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEqual } from "lodash";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { Programme } from "@/types/draftProgrammes";
import {
  FaAddressBook,
  FaBook,
  FaExclamation,
  FaList,
  FaPaperPlane,
  FaPaperclip,
  FaGraduationCap,
  FaUser,
  FaHouse,
} from "react-icons/fa6";
import { FaHeadset, FaQuestionCircle } from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";
import z from "zod";
import { EducationFileSchema, FormSchema, ImageSchema } from "./data";
import DraftTabs from "./draftTabs";

import {
  ApplicantAdditionalFileData,
  ApplicantImageData,
  ApplicationDetails,
} from "@/types/application";

import {
  deleteApplicantProgramme,
  addApplicantImageData,
  deleteApplicantImageData,
  deleteApplicantEducationFileData,
  addApplicantEducationFile,
  deleteApplicantAdditionalFileData,
  addApplicantAdditionalFile,
  saveApplicationData,
  submitApplicantApplication,
  addApplicantProgrammePriority,
} from "@/server/actions/application";

import Priorities from "./tabs/priorities";
import Profile from "./tabs/profile";
import Contacts from "./tabs/contacts";
import EmergencyContact from "./tabs/emergencyContact";
import Education from "./tabs/education";

import { ApplicantFormData } from "./data";

interface Props {
  data: ApplicationDetails;
  applicantApplicationId: string;
  applicantUsername: string;
  academicYearName: string;
  programmes: Programme[] | null;
}

const DraftContainer = ({
  data,
  applicantApplicationId,
  applicantUsername,
  academicYearName,
  programmes,
}: Props) => {
  const { firstName, lastName } = data.applicantProfile;
  const [nav, setNav] = useState(0);
  const [isSaved, setIsSaved] = useState(true);

  const [programmePriorities, setProgrammePriorities] = useState(
    data.programmePriorities,
  );
  const [programmePrioritiesErrorMessage, setProgrammePrioritiesErrorMessage] =
    useState("");

  const [imageErrorMessage, setImageErrorMessage] = useState("");
  const [educationFileErrorMessage, setEducationFileErrorMessage] =
    useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(
    data.applicantImageData.imageUrl,
  );
  const [draftSaving, setDraftSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddingProgramme, setIsAddingProgramme] = useState(false);
  const [uploadingImage, setIsUploadingImage] = useState(false);
  const [uploadingFile, setIsUploadingFile] = useState(false);

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
  }, [data.programmePriorities, programmePriorities]);

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
      firstName: data.applicantProfile.firstName,
      middleName: data.applicantProfile.middleName,
      lastName: data.applicantProfile.lastName,
      nida: data.applicantProfile.nida,
      disability: data.applicantProfile.disability,
      maritalStatus: data.applicantProfile.maritalStatus,
      dateOfBirth: data.applicantProfile.dateOfBirth,
      placeOfBirth: data.applicantProfile.placeOfBirth,
      applicantEmail: data.applicantContacts.email || "",
      applicantPhoneNumber: data.applicantContacts.phone,
      citizenship: data.applicantProfile.nationality,
      country: data.applicantContacts.country,
      emergencyContactCity: data.applicantEmergencyContacts.city,
      emergencyContactCountry: data.applicantEmergencyContacts.country,
      emergencyContactEmail: data.applicantEmergencyContacts.email || "",
      emergencyContactPhoneNumber: data.applicantEmergencyContacts.phone,
      emergencyContactPostalCode: data.applicantEmergencyContacts.postalCode,
      emergencyContactRegion: data.applicantEmergencyContacts.region,
      emergencyContactRelation: data.applicantEmergencyContacts.relation,
      emergencyContactStreetAddress:
        data.applicantEmergencyContacts.streetAddress,
      city: data.applicantContacts.city,
      gender: data.applicantProfile.gender,
      region: data.applicantContacts.region,
      postalCode: data.applicantContacts.postalCode,
      streetAddress: data.applicantContacts.streetAddress,
      emergencyContactFullName: data.applicantEmergencyContacts.fullName,
      applicantAlternativeEmail: data.applicantContacts.alternativeEmail || "",
      applicantAlternativePhoneNumber:
        data.applicantContacts.alternativePhoneNumber || "",
      emergencyContactAlternativeEmail:
        data.applicantEmergencyContacts.alternativeEmail || "",
      emergencyContactAlternativePhoneNumber:
        data.applicantEmergencyContacts.alternativePhoneNumber || "",
      education: data.applicantEducationBackground,
    },
  });

  const currentFormValues = useWatch({ control: form.control });

  useEffect(() => {
    const {
      applicantProfile: {
        firstName,
        middleName,
        lastName,
        nida,
        nationality: citizenship,
        gender,
        disability,
        placeOfBirth,
        dateOfBirth,
        maritalStatus,
      },
      applicantContacts: {
        email: applicantEmail = "",
        phone: applicantPhoneNumber,
        country,
        city,
        region,
        postalCode,
        streetAddress,
        alternativeEmail: applicantAlternativeEmail = "",
        alternativePhoneNumber: applicantAlternativePhoneNumber = "",
      },
      applicantEmergencyContacts: {
        city: emergencyContactCity,
        country: emergencyContactCountry,
        email: emergencyContactEmail = "",
        phone: emergencyContactPhoneNumber,
        postalCode: emergencyContactPostalCode,
        region: emergencyContactRegion,
        relation: emergencyContactRelation,
        streetAddress: emergencyContactStreetAddress,
        fullName: emergencyContactFullName,
        alternativeEmail: emergencyContactAlternativeEmail = "",
        alternativePhoneNumber: emergencyContactAlternativePhoneNumber = "",
      },
      applicantEducationBackground: education,
    } = data;

    const initialState = {
      firstName,
      middleName,
      lastName,
      nida,
      applicantEmail,
      applicantPhoneNumber,
      citizenship,
      country,
      disability,
      placeOfBirth,
      dateOfBirth,
      maritalStatus,
      emergencyContactCity,
      emergencyContactCountry,
      emergencyContactEmail,
      emergencyContactPhoneNumber,
      emergencyContactPostalCode,
      emergencyContactRegion,
      emergencyContactRelation,
      emergencyContactStreetAddress,
      city,
      gender,
      region,
      postalCode,
      streetAddress,
      emergencyContactFullName,
      applicantAlternativeEmail,
      applicantAlternativePhoneNumber,
      emergencyContactAlternativeEmail,
      emergencyContactAlternativePhoneNumber,
      education,
    };

    if (isEqual(initialState, currentFormValues)) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }
  }, [currentFormValues, data]);

  // Priorities

  const addProgramme = useCallback(
    async (programme: Programme) => {
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

      setIsAddingProgramme(true);

      // Optimistically update the state
      const tempId = (programmePriorities.length + 1).toString(); // Generate a temporary ID based on the

      setProgrammePriorities((prevProgrammes) => [
        ...prevProgrammes,
        {
          id: tempId,
          programmeCode: programme.code,
          priority: prevProgrammes.length + 1,
          programmeDetails: {
            name: programme.name,
            language: programme.language,
            level: programme.level,
          },
        },
      ]);

      // Then perform the server operation
      const responsePromise = addApplicantProgrammePriority(
        programme.code,
        applicantApplicationId,
        programmesLength + 1,
      );

      toast.promise(responsePromise, {
        loading: "Adding programme...",
        success: <b>Programme added!</b>,
        error: <b>Unfortunately, the programme could not be added.</b>,
      });

      handleGoToNav(0);

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

      setIsAddingProgramme(false);
    },
    [applicantApplicationId, programmePriorities],
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

      const responsePromise = deleteApplicantProgramme(
        programmeToDelete,
        applicantApplicationId,
      );

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
    [applicantApplicationId, programmePriorities],
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
        toast.promise(
          addApplicantImageData(imageDataResponse, applicantApplicationId),
          {
            loading: "Saving image...",
            success: <b>Image saved.</b>,
            error: <b>Oops failed to save image</b>,
          },
        );
        return true;
      } else if (error) {
        toast.error("Image upload failed!", { duration: 6000 });
        return false;
      }
    },
    [applicantApplicationId],
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
          setImagePreview(prevImage);
        }
      }

      event.target.value = "";
      setIsUploadingImage(false);
    },
    [data.applicantImageData, handleImageUpload, imagePreview],
  );

  const handleImageRemoval = useCallback(
    async (imageData: ApplicantImageData) => {
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
        toast.promise(deleteApplicantImageData(applicantApplicationId), {
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
    [applicantApplicationId],
  );

  const handleFileRemove = useCallback(async () => {
    const prevImagePreView = imagePreview;
    setIsUploadingImage(true);
    setImagePreview(null);
    setImageErrorMessage("");

    if (data.applicantImageData) {
      const success = await handleImageRemoval(data.applicantImageData);

      if (!success) {
        setImagePreview(prevImagePreView);
      }
    }

    setIsUploadingImage(false);
  }, [data.applicantImageData, handleImageRemoval, imagePreview]);

  // Profile

  // Education

  const handleEducationFileRemoval = useCallback(
    async (key: string) => {
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
        toast.promise(
          deleteApplicantEducationFileData(applicantApplicationId),
          {
            loading: "Removing file...",
            success: <b>File removed.</b>,
            error: <b>Oops failed to remove file</b>,
          },
        );
        return true;
      } else {
        toast.error("File removal failed!", { duration: 6000 });
        return false;
      }
    },
    [applicantApplicationId],
  );

  const handleEducationFileRemove = useCallback(async () => {
    if (data.applicantAdditionalFileData.length > 0) {
      toast.error(
        "Please delete additional files before deleting the main file.",
        { duration: 6000 },
      );

      return;
    }

    setIsUploadingFile(true);
    setEducationFileErrorMessage("");

    if (data.applicantEducationFileData.key) {
      const success = await handleEducationFileRemoval(
        data.applicantEducationFileData.key,
      );
    }

    setIsUploadingFile(false);
  }, [
    data.applicantAdditionalFileData.length,
    data.applicantEducationFileData.key,
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
        toast.promise(
          addApplicantEducationFile(
            fileDataResponse,
            file.type,
            applicantApplicationId,
          ),
          {
            loading: "Saving file...",
            success: <b>File saved.</b>,
            error: <b>Oops failed to save file</b>,
          },
        );
        return true;
      } else if (error) {
        toast.error("File upload failed!", { duration: 6000 });
        return false;
      }
    },
    [applicantApplicationId],
  );

  const handleEducationFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files ? event.target.files[0] : null;
      setEducationFileErrorMessage("");

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
        // FIXME: check if file exists
        if (data.applicantEducationFileData.key) {
          success = await handleEducationFileUpload(
            file,
            "PUT",
            data.applicantEducationFileData,
          );
        } else {
          success = await handleEducationFileUpload(file, "POST");
        }
      }

      event.target.value = "";
      setIsUploadingFile(false);
    },
    [data.applicantEducationFileData, handleEducationFileUpload],
  );

  const handleAdditionalFileRemove = useCallback(
    async (file: ApplicantAdditionalFileData) => {
      setIsUploadingFile(true);
      setEducationFileErrorMessage("");

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
        toast.promise(
          deleteApplicantAdditionalFileData(file.id, applicantApplicationId),
          {
            loading: "Removing file...",
            success: <b>File removed.</b>,
            error: <b>Oops failed to remove file</b>,
          },
        );
      } else {
        toast.error("File removal failed!", { duration: 6000 });
      }

      setIsUploadingFile(false);
    },
    [applicantApplicationId],
  );

  const handleAdditionalFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const formData = new FormData();
      const file = event.target.files ? event.target.files[0] : null;
      setEducationFileErrorMessage("");

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
            addApplicantAdditionalFile(
              fileDataResponse,
              file.type,
              applicantApplicationId,
            ),
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
    [applicantApplicationId],
  );

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

    const responsePromise = submitApplicantApplication(applicantApplicationId);

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

    const responsePromise = saveApplicationData(
      applicantFormData,
      applicantApplicationId,
    );

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
    if (!data.applicantImageData.imageUrl) {
      setImageErrorMessage("Image is required.");
    }

    // If either condition is not met, return early
    if (programmePriorities.length < 3 || !data.applicantImageData.imageUrl) {
      return;
    }

    await form.handleSubmit(onSubmit)();
  };

  const clearAllErrors = () => {
    form.clearErrors();
    setProgrammePrioritiesErrorMessage("");
    setImageErrorMessage("");
  };

  const handleGoToNav = (itemIndex: number) => {
    setNav(itemIndex);
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
          programmePrioritiesErrorMessage={programmePrioritiesErrorMessage}
          onMoveDown={moveDown}
          onGotoItem={handleGoToNav}
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
          applicantImageData={data.applicantImageData}
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
          applicantApplicationId={applicantApplicationId}
          applicantEducationFileData={data.applicantEducationFileData}
          onFileUpdate={handleEducationFileChange}
          applicantAdditionalFileData={data.applicantAdditionalFileData}
          onFileRemove={handleEducationFileRemove}
          onAdditionalFileUpdate={handleAdditionalFileChange}
          onAdditionalFileRemove={handleAdditionalFileRemove}
          applicantHighestEducation={data.applicantHighestEducation}
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
          applicantControlNumber={data.applicantControlNumber}
          applicantApplicationId={applicantApplicationId}
        />
      ),
      label: "payments",
      Icon: FaCreditCard,
    },
  ];

  const navs: Tab[] = [
    {
      content: (
        <Draft
          onDraftSave={handleSaveAsDraft}
          onApplicationSubmit={handleSubmitApplication}
          draftSaving={draftSaving}
          isSubmitting={isSubmitting}
          form={form}
          tabs={tabs}
          data={data}
        />
      ),
      label: "draft",
      Icon: FaInbox,
    },
    {
      content: (
        <Programmes
          applicantApplicationId={applicantApplicationId}
          programmes={programmes}
          onGotoItem={handleGoToNav}
          handleAddApplicantProgramme={addProgramme}
        />
      ),
      label: "programmes",
      Icon: FaMagnifyingGlass,
    },
    {
      content: <>support: How to apply and contact support tab and faq</>,
      label: "support",
      Icon: FaHeadset,
    },
    {
      content: <Settings />,
      label: "settings",
      Icon: FaGear,
    },
  ];

  const currentNav = navs[nav];

  return (
    <>
      <DraftSidebar
        academicYearName={academicYearName}
        username={applicantUsername}
        imageUrl={data.applicantImageData.imageUrl}
        fullName={`${firstName} ${lastName}`}
        applicantApplicationId={applicantApplicationId}
        itemIndex={nav}
        items={navs}
        onGotoItem={handleGoToNav}
      />

      <BottomNavigation
        itemIndex={nav}
        items={navs}
        onGotoItem={handleGoToNav}
      />
      <div className="mb-16 p-2 sm:ml-64 md:mb-0">
        <MainContent>{currentNav.content}</MainContent>
      </div>
    </>
  );
};

export default DraftContainer;
