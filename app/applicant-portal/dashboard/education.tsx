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
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import moment from "moment-timezone";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import { FiArrowDown, FiArrowUp, FiTrash2 } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import z from "zod";
import { FormSchema, educationLevel } from "./data";
import pdf_icon from "@/public/pdf2.svg";
import {
  addApplicantEducationBackground,
  deleteApplicantEducationBackground,
} from "./actions";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  EducationLevel,
  AdditionalEducationFile,
  EducationFile,
} from "@prisma/client";
import { formatBytes } from "@/utils";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";

interface Props {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
  draftSaving: boolean;
  isSubmitting: boolean;

  uploadingFile: boolean;
  applicantHighestEducation: EducationLevel;
  applicantEducationFileData: EducationFile;
  applicantAdditionalFileData: AdditionalEducationFile[];
  onFileUpdate: (event: ChangeEvent<HTMLInputElement>) => void;
  onAdditionalFileUpdate: (event: ChangeEvent<HTMLInputElement>) => void;
  onFileRemove: () => void;
  onAdditionalFileRemove: (file: AdditionalEducationFile) => void;
}

const maxItems = 4;

function getEducationLevelDisplayText(level: EducationLevel): string {
  switch (level) {
    case "FORM_IV":
      return "Form IV";
    case "FORM_VI":
      return "Form VI";
    case "VETA_NVA_III":
      return "VETA NVA III";
    case "NTA_LEVEL_IV":
      return "NTA Level IV";
    case "NTA_LEVEL_V":
      return "NTA Level V";
    case "DIPLOMA":
      return "Diploma";
    case "DEGREE":
      return "Degree";
    case "MASTERS":
      return "Masters";
    default:
      return "";
  }
}

const renderFilePreview = (
  educationFileType: string,
  educationFileUrl: string,
) => {
  if (educationFileType === "application/pdf") {
    // Render PDF viewer
    return (
      <div className="relative h-28 w-20">
        <Image
          fill
          quality={100}
          className="inline-block rounded-lg object-cover"
          src={pdf_icon}
          alt="Education Document"
        />
      </div>
    );
  } else if (educationFileType.startsWith("image/")) {
    // Render image viewer
    return (
      <div className="relative h-28 w-20">
        <Image
          fill
          quality={100}
          className="inline-block rounded-lg object-cover"
          src={educationFileUrl}
          alt="Education Document"
        />
      </div>
    );
  }

  return null;
};

const today = moment().tz("Africa/Dar_es_Salaam").format("YYYY-MM-DDTHH:mm");

const Education = ({
  form,
  draftSaving,
  isSubmitting,
  applicantHighestEducation,
  applicantEducationFileData,
  applicantAdditionalFileData,
  onFileUpdate,
  onFileRemove,
  onAdditionalFileUpdate,
  uploadingFile,
  onAdditionalFileRemove,
}: Props) => {
  const { fields, append, move, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const multipleFilesInputRef = useRef<HTMLInputElement>(null);

  const handleAddItem = async () => {
    if (fields.length < maxItems) {
      // Optimistically update the state
      const tempId = (fields.length + 1).toString(); // Generate a temporary ID based on the length of the array
      append({
        _id: tempId,
        position: fields.length,
        level: "",
        schoolName: "",
        startYear: today,
        endYear: today,
      });

      const educationFields = form.getValues("education");

      setIsLoading(true);

      await addApplicantEducationBackground(educationFields.length)
        .then((value) => {
          educationFields[educationFields.length - 1]._id = value;
        })
        .catch((error) => {
          remove(educationFields.length);
          toast.error("Unfortunately, the education card could not be added.", {
            duration: 6000,
          });
        });

      setIsLoading(false);
    }
  };

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      move(index, index - 1);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < fields.length - 1) {
      move(index, index + 1);
    }
  };

  const handleDelete = async (index: number) => {
    if (fields.length > 1) {
      const educationFields = form.getValues("education");
      const removedItem = fields[index]; // Store the removed item

      remove(index);

      const removeItemId = educationFields[index]._id;

      setIsLoading(true);

      const responsePromise = deleteApplicantEducationBackground(removeItemId);

      toast.promise(responsePromise, {
        loading: "Deleting education card...",
        success: <b>Education card deleted!</b>,
        error: <b>Unfortunately, the education card could not be deleted.</b>,
      });

      await responsePromise.catch((error) => {
        // If the server operation fails, revert the optimistic update
        fields.splice(index, 0, removedItem); // Add the removed item back to its original position
      });

      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleMultipleFileSelect = () => {
    multipleFilesInputRef.current?.click();
  };

  return (
    <>
      <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
        Share Your Academic Journey
      </h1>
      <p className="my-3 text-gray-800 dark:text-gray-400">
        Tell us about your educational background. Every step of your academic
        journey is important to us.
      </p>
      {fields.map((item, index) => (
        <Card key={item._id} className="my-3 w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge className="shrink-0"># {index + 1}</Badge>
              <div className="flex items-center space-x-2">
                <Button
                  disabled={index === 0 || isSubmitting || draftSaving}
                  onClick={() => handleMoveUp(index)}
                  variant="outline"
                  size="icon"
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FiArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  disabled={
                    index === fields.length - 1 || isSubmitting || draftSaving
                  }
                  onClick={() => handleMoveDown(index)}
                  variant="outline"
                  size="icon"
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FiArrowDown className="h-4 w-4" />
                </Button>
                {fields.length > 1 && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        disabled={isLoading || isSubmitting || draftSaving}
                        variant="outline"
                        size="icon"
                        className="text-red-500 hover:bg-red-600 hover:text-white "
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Confirm Item Removal
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to remove this Item?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>No, Keep It</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 hover:bg-red-700"
                          onClick={() => handleDelete(index)}
                        >
                          Yes, Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <FormField
                control={form.control}
                name={`education.${index}.level`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level of education</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger disabled={isSubmitting || draftSaving}>
                          <SelectValue placeholder="Select education level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {educationLevel.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`education.${index}.schoolName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Official name of school or university</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isSubmitting || draftSaving}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-3">
              <FormField
                control={form.control}
                name={`education.${index}.startYear`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Issue date/Start date</FormLabel>
                    <FormControl>
                      <Input
                        className="w-40 px-2"
                        type="month"
                        id="Issue date/Start date"
                        disabled={isSubmitting || draftSaving}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`education.${index}.endYear`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>(Expected) graduation date</FormLabel>
                    <FormControl>
                      <Input
                        className="w-40 px-2"
                        type="month"
                        id="(Expected) graduation"
                        disabled={isSubmitting || draftSaving}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="mt-5 flex w-full items-center justify-center">
        <Button
          disabled={
            fields.length >= maxItems ||
            isLoading ||
            isSubmitting ||
            draftSaving
          }
          className="flex items-center gap-2"
          variant={"outline"}
          onClick={handleAddItem}
        >
          <MdAdd className="h-5 w-5 shrink-0" />
          Add new Education Card
        </Button>
      </div>
      <Separator className="my-4 h-1.5" />
      <div className="mb-6">
        <div>
          <Label>
            {applicantEducationFileData.url ? (
              <h3 className="my-4 block text-lg font-bold text-gray-800 dark:text-white">
                {getEducationLevelDisplayText(applicantHighestEducation)} File
              </h3>
            ) : (
              <Label className="block text-sm text-gray-500 dark:text-gray-300">
                Kindly proceed with uploading your{" "}
                {getEducationLevelDisplayText(applicantHighestEducation)}{" "}
                document. We appreciate your cooperation.
              </Label>
            )}
          </Label>

          {applicantEducationFileData.url && (
            <div className="my-1 flex gap-2">
              {renderFilePreview(
                applicantEducationFileData.type,
                applicantEducationFileData.url,
              )}
              <div className="flex flex-col justify-between">
                <h3 className="block font-bold text-gray-800 dark:text-white">
                  {applicantEducationFileData.name}
                </h3>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {formatBytes(applicantEducationFileData.size)}
                  </p>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleButtonClick}
                      size={"sm"}
                      disabled={uploadingFile || isSubmitting || draftSaving}
                      variant={"secondary"}
                    >
                      change file
                    </Button>
                    <Button
                      onClick={onFileRemove}
                      size={"sm"}
                      disabled={uploadingFile || isSubmitting || draftSaving}
                      variant={"destructive"}
                    >
                      {/* <IoMdTrash className="mr-2 h-4 w-4 shrink-0" /> */}
                      delete file
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <label
            className={`mx-auto ${
              applicantEducationFileData.url ? "hidden" : ""
            } mt-2 flex w-full max-w-lg cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-gray-300 bg-white p-5 text-center dark:border-gray-700 dark:bg-gray-900`}
          >
            <AiOutlineCloudUpload className="h-8 w-8 text-gray-500 dark:text-gray-400" />

            <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">
              {getEducationLevelDisplayText(applicantHighestEducation)} File
            </h2>

            <p className="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">
              Upload or drag & drop your file. SVG, PNG, JPG, GIF, PDF, and TIF.
            </p>

            <input
              accept="image/jpeg, image/jpg, image/gif, image/png, application/pdf, image/tif"
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={onFileUpdate}
            />
          </label>
        </div>
        {applicantEducationFileData.url && (
          <div>
            <div className="my-4">
              <h3 className="block text-lg font-bold text-gray-800 dark:text-white">
                Additional Files
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                While you have the option to upload additional files, please
                note that this is not mandatory. Feel free to proceed with your
                application even if you choose to leave this section as is.
              </p>
            </div>

            <input
              accept="image/jpeg, image/jpg, image/gif, image/png, application/pdf, image/tif"
              type="file"
              className="hidden"
              ref={multipleFilesInputRef}
              onChange={onAdditionalFileUpdate}
            />

            <div className="space-y-4">
              {applicantAdditionalFileData.map((file) => (
                <div className="flex gap-2" key={file.id}>
                  {renderFilePreview(file.type, file.url)}
                  <div className="flex flex-col justify-between">
                    <h3 className="block font-bold text-gray-800 dark:text-white">
                      {file.name}
                    </h3>
                    <div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {formatBytes(file.size)}
                      </p>
                      <Button
                        onClick={() => onAdditionalFileRemove(file)}
                        size={"sm"}
                        disabled={uploadingFile || isSubmitting || draftSaving}
                        variant={"destructive"}
                      >
                        delete file
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {applicantAdditionalFileData.length < 3 && (
              <Button
                disabled={uploadingFile || isSubmitting || draftSaving}
                className="my-4 bg-green-500 hover:bg-green-600"
                onClick={handleMultipleFileSelect}
              >
                <IoIosAddCircle className="mr-2 h-4 w-4 shrink-0" />
                Add additional files
              </Button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Education;
