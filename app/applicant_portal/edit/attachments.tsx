import { ChangeEvent, useRef, useState } from "react";

import { EducationLevelName } from "@/types/application";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { BiSolidFilePdf } from "react-icons/bi";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import pdf_icon from "@/public/pdf2.svg";
import { IoMdTrash, IoIosAddCircle } from "react-icons/io";
import { formatBytes } from "@/utils";

interface Props {
  applicantHighestEducation: EducationLevelName;
}

function getEducationLevelDisplayText(level: EducationLevelName): string {
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

const renderFilePreview = (educationFile: File | null) => {
  if (educationFile) {
    const fileType = educationFile.type;
    if (fileType === "application/pdf") {
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
    } else if (fileType.startsWith("image/")) {
      // Render image viewer
      return (
        <div className="relative h-28 w-20">
          <Image
            fill
            quality={100}
            className="inline-block rounded-lg object-cover"
            src={URL.createObjectURL(educationFile)}
            alt="Education Document"
          />
        </div>
      );
    } else {
      // Handle other file types or error state
      return <p>Unsupported file type: {fileType}</p>;
    }
  }
  return null;
};

const Attachments = ({ applicantHighestEducation }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const multipleFilesInputRef = useRef<HTMLInputElement>(null);
  const [educationCertFile, setEducationCertFile] = useState<File | null>(null);
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleMultipleFileSelect = () => {
    multipleFilesInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;

    if (file) {
      setEducationCertFile(file);
      const url = URL.createObjectURL(file);
    }

    event.target.value = "";
  };

  const handleAdditionalFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setAdditionalFiles((prevFiles) => [...prevFiles, file]);
    }
    event.target.value = "";
  };

  return (
    <div className="mb-6">
      <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
        Submit Your Documents
      </h1>
      <p className="my-3 text-gray-800 dark:text-gray-400">
        It&rsquo;s document time! Upload the necessary files for your
        application. Make sure everything is ready and readable.
      </p>
      <div>
        <Label>
          {educationCertFile ? (
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

        {educationCertFile ? (
          <div className="my-1 flex gap-2">
            {renderFilePreview(educationCertFile)}
            <div className="flex flex-col justify-between">
              <h3 className="block font-bold text-gray-800 dark:text-white">
                {educationCertFile.name}
              </h3>
              <div>
                <p className="text-gray-600 dark:text-gray-400">
                  {formatBytes(educationCertFile.size)}
                </p>
                <Button size={"sm"} variant={"destructive"}>
                  {/* <IoMdTrash className="mr-2 h-4 w-4 shrink-0" /> */}
                  delete file
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <label className="mx-auto mt-2 flex w-full max-w-lg cursor-pointer flex-col items-center rounded-xl border-2 border-dashed border-gray-300 bg-white p-5 text-center dark:border-gray-700 dark:bg-gray-900">
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
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>
      {educationCertFile && (
        <div>
          <div className="my-4">
            <h3 className="block text-lg font-bold text-gray-800 dark:text-white">
              Additional Files
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              While you have the option to upload additional files, please note
              that this is not mandatory. Feel free to proceed with your
              application even if you choose to leave this section as is.
            </p>
          </div>

          <input
            accept="image/jpeg, image/jpg, image/gif, image/png, application/pdf, image/tif"
            type="file"
            className="hidden"
            ref={multipleFilesInputRef}
            onChange={handleAdditionalFileChange}
          />

          <div className="space-y-4">
            {additionalFiles.map((file, index) => (
              <div className="flex gap-2" key={index}>
                {renderFilePreview(file)}
                <div className="flex flex-col justify-between">
                  <h3 className="block font-bold text-gray-800 dark:text-white">
                    {file.name}
                  </h3>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">
                      {formatBytes(file.size)}
                    </p>
                    <Button size={"sm"} variant={"destructive"}>
                      {/* <IoMdTrash className="mr-2 h-4 w-4 shrink-0" /> */}
                      delete file
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {additionalFiles.length < 3 && (
            <Button
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
  );
};

export default Attachments;
