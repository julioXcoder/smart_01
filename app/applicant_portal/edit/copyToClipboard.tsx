"use client";
import React, { useState } from "react";
import { CheckIcon, ClipboardIcon } from "@radix-ui/react-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import toast from "react-hot-toast";

const CopyToClipboard = () => {
  const [controlNumber, setControlNumber] = useState(
    "213142343242342342342342342",
  );
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(controlNumber);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 600);
    } catch (err) {
      toast.error("Failed to copy text: ", { duration: 4000 });
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className="relative inline-flex cursor-pointer items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 font-mono text-sm text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            onClick={handleCopy}
          >
            {controlNumber}
            <span className="border-s ps-3.5 dark:border-gray-700">
              {copySuccess ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                <ClipboardIcon className="h-4 w-4 text-blue-600 group-hover:rotate-6" />
              )}
            </span>
            {copySuccess && (
              <div className="absolute left-2 top-14 ml-2 rounded bg-green-500 p-1 text-xs text-white">
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
