import { IconType } from "react-icons";
import { FaFileArchive } from "react-icons/fa";
import {
  FaFilePowerpoint,
  FaFileWord,
  FaFilePdf,
  FaFile,
} from "react-icons/fa6";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return bytes + " Bytes";
  else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + " KB";
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + " MB";
  else return (bytes / 1073741824).toFixed(2) + " GB";
}

function getUserInitials(fullName: string): string {
  // Split the full name into an array of words
  const words = fullName.split(" ");

  // Initialize an empty string to hold the initials
  let initials = "";

  // Loop through each word in the array
  for (const word of words) {
    // Append the first character of each word to the initials string
    initials += word.charAt(0).toUpperCase();
  }

  // Return the initials
  return initials;
}

function getFileIcon(fileType: string) {
  let icon: IconType;

  switch (fileType) {
    case "pdf":
      icon = FaFilePdf;
      break;
    case "doc":
    case "docx":
      icon = FaFileWord;
      break;
    case "xls":
    case "xlsx":
      icon = PiMicrosoftExcelLogoFill;
      break;
    case "ppt":
    case "pptx":
      icon = FaFilePowerpoint;
      break;
    // case 'jpg':
    // case 'jpeg':
    // case 'png':
    // case 'gif':
    //   icon = 'image-icon.png';
    //   break;
    case "zip":
    case "rar":
      icon = FaFileArchive;
      break;
    default:
      icon = FaFile;
  }

  return icon;
}

function getMimeType(fileName: string): string {
  const extension = fileName.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "webp":
      return "image/webp";
    case "pdf":
      return "application/pdf";
    case "ppt":
    case "pptx":
      return "application/vnd.ms-powerpoint";
    case "doc":
    case "docx":
      return "application/msword";
    case "xls":
    case "xlsx":
      return "application/vnd.ms-excel";
    case "txt":
      return "text/plain";
    case "csv":
      return "text/csv";
    case "zip":
      return "application/zip";
    case "rar":
      return "application/x-rar-compressed";
    case "mp3":
      return "audio/mpeg";
    case "mp4":
      return "video/mp4";
    case "mov":
      return "video/quicktime";
    // Add more cases as needed
    default:
      return "application/octet-stream"; // Fallback MIME type
  }
}

export default function getTimeOfDay() {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return "morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "afternoon";
  } else {
    return "evening";
  }
}

export { formatBytes, getUserInitials, getFileIcon, getMimeType, getTimeOfDay };
