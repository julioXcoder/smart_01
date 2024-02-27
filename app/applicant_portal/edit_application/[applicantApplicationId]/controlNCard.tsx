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
import { PaymentStatusName } from "@/types/application";

interface Props {
  controlNumber: string;
  status: PaymentStatusName;
}

const ControlNCard = ({ controlNumber, status }: Props) => {
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
    <div className="p-3">
      Thank you for advancing in your application process. We’ve generated a
      unique control number for your payment of 10,000 Tanzanian Shillings.
      Please complete the payment within four days. Once your payment is
      successfully processed, you’ll be able to proceed to the next step. We
      appreciate your prompt attention to this matter.
      <span className="mt-2 space-y-2">
        <h1 className="font-bold">My control number</h1>
        <p>status: {status}</p>
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
      </span>
    </div>
  );
};

export default ControlNCard;
