import { Button } from "@/components/ui/button";
import Image from "next/image";
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
import { FaExchangeAlt, FaExpandArrowsAlt } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  imageUrl: string;
  onChangeImage?: () => void;
  onDeleteImage?: () => void;
}

const ImageCard = ({ imageUrl, onChangeImage, onDeleteImage }: Props) => {
  return (
    <Card className="h-36 max-w-[450px]">
      <CardContent className="flex h-full w-full items-center justify-start p-2">
        <Dialog>
          <DialogTrigger asChild>
            <div className="relative aspect-square h-32 overflow-hidden rounded-md">
              {/* FIXME: Use shad cn aspect ratio */}
              {/* <div className="w-[450px]">
                    <AspectRatio ratio={16 / 9}>
                    <Image src="..." alt="Image" className="rounded-md object-cover" />
                    </AspectRatio>
                  </div> */}
              <Image
                src={imageUrl}
                className="object-cover"
                alt="image file"
                fill
                quality={100}
              />
              <div className="group absolute inset-0 left-0 top-0 flex h-full w-full cursor-pointer items-center justify-center bg-gray-700 opacity-0 transition-opacity hover:opacity-80">
                <p className="hidden flex-col items-center justify-center gap-y-1 text-center text-gray-300 group-hover:flex">
                  {/* Tap to expand! */}
                  <FaExpandArrowsAlt className="size-7 flex-shrink-0" />
                  <span>Expand</span>
                </p>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent>
            <div className="relative m-10 h-96 w-auto overflow-hidden rounded-md">
              <Image
                src={imageUrl}
                className="object-cover"
                alt="image file"
                fill
                quality={100}
              />
            </div>
          </DialogContent>
        </Dialog>

        <div className="flex h-full flex-grow flex-col justify-between px-3">
          <div className="flex-1 space-y-1">
            <CardTitle className="max-w-[9rem] truncate text-lg md:max-w-[18rem]">
              Push Notificati sssssss asssssssss assssssss as adas adas
            </CardTitle>
            <CardDescription className="flex h-5 items-center space-x-4 text-sm">
              <p>File type</p>
              <Separator orientation="vertical" />
              <p>File size</p>
            </CardDescription>
          </div>

          <div className="flex gap-x-2">
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
            {onChangeImage && (
              <Button onClick={onChangeImage} className="flex flex-grow">
                <FaExchangeAlt className="mr-2 size-4 flex-shrink-0" />
                Change
              </Button>
            )}
            {onDeleteImage && (
              <Button
                variant="destructive"
                onClick={onDeleteImage}
                className="flex flex-grow"
              >
                <FaTrash className="mr-2 size-4 flex-shrink-0" />
                Delete
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageCard;
