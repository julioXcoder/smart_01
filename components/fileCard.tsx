import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { FaTrash, FaDownload } from "react-icons/fa6";

import {
  Card,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getFileIcon } from "@/utils";
import { FaExchangeAlt } from "react-icons/fa";

const FileCard = () => {
  const FileIcon = getFileIcon("doc");

  return (
    <Card className="max-w-[450px]">
      <CardContent className="flex w-full items-center justify-between p-4">
        <div className="flex items-center space-x-4 overflow-hidden">
          <FileIcon className="size-5 flex-shrink-0 lg:size-6" />
          <div className="flex-1 space-y-1">
            <CardTitle className="max-w-[9rem] truncate md:max-w-[14rem]">
              Push Notificati sssssss asssssssss assssssss as
            </CardTitle>
            <CardDescription className="flex h-5 items-center space-x-4 text-sm">
              <p>File type</p>
              <Separator orientation="vertical" />
              <p>File size</p>
            </CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-x-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <FaDownload className="size-4 flex-shrink-0" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <FaExchangeAlt className="size-4 flex-shrink-0" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Change</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600"
                >
                  <FaTrash className="size-4 flex-shrink-0" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileCard;
