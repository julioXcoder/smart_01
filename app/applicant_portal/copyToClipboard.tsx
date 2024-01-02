"use client";
import React, { useState } from "react";
import { CheckIcon, ClipboardIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const CopyToClipboard = () => {
  const [controlNumber, setControlNumber] = useState(
    "213142343242342342342342342"
  );
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(controlNumber);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 600);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="relative cursor-pointer py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-mono rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            onClick={handleCopy}
          >
            {controlNumber}
            <span className="border-s ps-3.5 dark:border-gray-700">
              {copySuccess ? (
                <CheckIcon className="w-4 h-4" />
              ) : (
                <ClipboardIcon className="w-4 h-4 group-hover:rotate-6 text-blue-600" />
              )}
            </span>
            {copySuccess && (
              <div className="absolute top-14 left-2 ml-2 p-1 bg-green-500 text-white text-xs rounded">
                Copied!
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          {copySuccess ? <p>Copied!</p> : <p>Copy</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CopyToClipboard;
