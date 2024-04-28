"use client";

import AddFileCard from "@/components/addFileCard";
import FileCard from "@/components/fileCard";
import ImageCard from "@/components/file-cards/imageCard";
import { formatBytes } from "@/utils";
import { getFile } from "@/app/actions";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const Page = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [fileName, setFileName] = useState("");

  const onGetFile = async () => {
    // const response = await getFile("gon1.webp");
    const response = await fetch(
      `/getFile.server.ts?fileName=${encodeURIComponent("gon1.webp")}`,
    );
    console.log("response", response);
    if (!response.ok) {
      throw new Error("File not found");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gon1.webp";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  };

  async function downloadFile(fileName: string) {
    const response = await fetch(
      `/api/applicant/file/test?fileName=${encodeURIComponent(fileName)}`,
    );
    if (!response.ok) {
      console.log(response);
      // throw new Error("File not found");
    }
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  // async function displayFilePreview(fileName: string) {
  //   const response = await fetch(
  //     `/api/applicant/file/test?fileName=${encodeURIComponent(fileName)}`,
  //   );
  //   if (!response.ok) {
  //     console.error("File not found");
  //     return;
  //   }
  //   const blob = await response.blob();

  //   // Display file metadata
  //   console.log("File Name:", fileName);
  //   console.log("File Size:", blob.size);

  //   // Determine the file type and handle accordingly
  //   const fileType = blob.type;
  //   console.log("File Type:", fileType);

  //   // If the file is an image, display it
  //   if (fileType.startsWith("image/")) {
  //     const img = document.createElement("img");
  //     img.src = window.URL.createObjectURL(blob);
  //     img.onload = () => {
  //       window.URL.revokeObjectURL(img.src); // Clean up after loading
  //     };
  //     img.alt = "User Profile Picture";
  //     document.body.appendChild(img);
  //   } else {
  //     // For non-image files, you might want to handle them differently
  //     // For example, you could display the file name and size, or use a file viewer
  //   }
  //   console.log("url", window.URL.createObjectURL(blob));

  //   return window.URL.createObjectURL(blob);
  // }

  async function fetchImage(fileName: string) {
    try {
      const response = await fetch(
        `/api/applicant/file/test?fileName=${encodeURIComponent(fileName)}`,
      );
      if (!response.ok) {
        throw new Error("Image not found");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setImageUrl(url);
    } catch (error) {
      console.error(error);
    }
  }

  async function fetchFile(fileName: string) {
    try {
      const response = await fetch(
        `/api/applicant/file/test?fileName=${encodeURIComponent(fileName)}`,
      );
      if (!response.ok) {
        throw new Error("File not found");
      }
      const blob = await response.blob();
      const file = new File([blob], fileName, { type: blob.type });
      const size = formatBytes(file.size);

      setFileSize(size);
      setFileName(file.name);
      console.log(file.lastModified);
      // Now you can use the file object
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="mx-auto mt-28 w-full max-w-[45rem]">
      Add file
      <AddFileCard />
      <div className="mt-10">
        <Button onClick={() => fetchImage("gon1.webp")}>Get file</Button>
      </div>
      <div className="my-4">
        <FileCard />
      </div>
      <div className="mt-10">
        <ImageCard
          onDeleteImage={() => console.log("Deleted!")}
          onChangeImage={() => console.log("Changed!")}
          imageUrl={imageUrl}
        />
      </div>
    </div>
  );
};

export default Page;
