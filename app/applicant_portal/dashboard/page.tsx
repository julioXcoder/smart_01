import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { IoWarning } from "react-icons/io5";
import { Separator } from "@/components/ui/separator";
import { LiaHandPointRightSolid } from "react-icons/lia";
import { MdModeEdit } from "react-icons/md";
import { Badge } from "@/components/ui/badge";

const Page = () => {
  return (
    <div className="mt-20 w-full md:px-28">
      <Card className="w-full">
        <CardHeader>
          <div className="flex w-full justify-between">
            <div className="flex items-center gap-2">
              <IoWarning className="h-12 w-12 shrink-0 text-orange-400" />
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-200">
                  The application is still a draft
                </p>
                <p className="text-xs text-gray-500">Deadline: 31 Aug 2024</p>
              </div>
            </div>
            <Badge className="shrink-0" variant={"secondary"}>
              DRAFT
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Separator className="mb-4 h-1.5" />
          {false && (
            <div className="flex h-10 w-full items-center justify-center">
              No Programs selected
            </div>
          )}
          <div className="flex w-full flex-col gap-1 px-4">
            <div className="flex w-full items-center gap-2">
              <div className="shrink-0 text-3xl">1</div>
              <div className="ms-3 sm:ms-4">
                <p className="font-semibold text-gray-800 sm:mb-1 dark:text-gray-200">
                  Louise Donadieu Strategic Marketing Consultant Strategic
                  Marketing Consultant
                </p>
                <p className="text-xs text-gray-500">
                  Strategic Marketing Consultant
                </p>
              </div>
            </div>
            <Separator className="my-5 h-0.5" />
            <div className="flex w-full items-center gap-2">
              <div className="shrink-0 text-3xl">2</div>
              <div className="ms-3 sm:ms-4">
                <p className="font-semibold text-gray-800 sm:mb-1 dark:text-gray-200">
                  Louise Donadieu
                </p>
                <p className="text-xs text-gray-500">
                  Strategic Marketing Consultant
                </p>
              </div>
            </div>
            <Separator className="my-5 h-0.5" />
          </div>
        </CardContent>
        <CardDescription className="flex items-center bg-yellow-100 p-1">
          <LiaHandPointRightSolid className="mx-2 h-4 w-4 shrink-0" />{" "}
          Important! The application is currently not submitted! Please click on
          the &apos;Edit application&apos; button to do so.
        </CardDescription>
      </Card>
      <Button className="mt-4 w-full ">
        <MdModeEdit className="mr-2 h-5 w-5 shrink-0" />
        Edit Application
      </Button>
    </div>
  );
};

export default Page;
