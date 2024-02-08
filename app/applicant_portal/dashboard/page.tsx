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
import Link from "next/link";
import { ApplicationStatusName } from "@/types/application";
import { getApplicationStatus } from "@/server/actions/applicant";
import {
  AiOutlineInfoCircle,
  AiOutlineExclamationCircle,
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineSearch,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import { ReactNode } from "react";

function getStatusText(applicationStatus: ApplicationStatusName): {
  title: string;
  description: string;
  color: string;
  TitleIcon: ReactNode;
  DescriptionIcon: ReactNode;
} {
  switch (applicationStatus) {
    case "DRAFT":
      return {
        title: "Your Application is in Draft Mode",
        description:
          "Important! - Your application hasn't been submitted yet! Please click on the 'Edit Application' button to complete it.",
        TitleIcon: (
          <AiOutlineInfoCircle className="h-12 w-12 shrink-0 text-gray-400" />
        ),
        DescriptionIcon: (
          <AiOutlineExclamationCircle className="mx-2 h-4 w-4 shrink-0" />
        ),
        color: "bg-gray-300 dark:bg-gray-400",
      };
    case "ACCEPTED":
      return {
        title: "Congratulations, Your Application is Accepted!",
        description:
          "Your application has been accepted! Please click on the 'Continue Application' button to proceed.",
        TitleIcon: (
          <AiOutlineCheckCircle className="h-12 w-12 shrink-0 text-green-400" />
        ),
        DescriptionIcon: (
          <AiOutlineInfoCircle className="mx-2 h-4 w-4 shrink-0" />
        ),
        color: "bg-green-400",
      };
    case "UNDER_REVIEW":
      return {
        title: "Your Application is Under Review",
        description:
          "Your application is currently being reviewed by our team. We appreciate your patience during this process.",
        TitleIcon: (
          <AiOutlineSearch className="h-12 w-12 shrink-0 text-blue-400" />
        ),
        DescriptionIcon: (
          <AiOutlineClockCircle className="mx-2 h-4 w-4 shrink-0" />
        ),
        color: "bg-blue-400",
      };
    case "REJECTED":
      return {
        title: "Unfortunately, Your Application Was Not Accepted",
        description:
          "We regret to inform you that your application was not accepted. Please review the feedback provided and consider reapplying.",
        TitleIcon: (
          <AiOutlineCloseCircle className="h-12 w-12 shrink-0 text-red-400" />
        ),
        DescriptionIcon: (
          <AiOutlineExclamationCircle className="mx-2 h-4 w-4 shrink-0" />
        ),
        color: "bg-red-400",
      };
    default:
      return {
        title: "",
        description: "",
        TitleIcon: <></>,
        DescriptionIcon: <></>,
        color: "",
      };
  }
}

const Page = async () => {
  const { data, error } = await getApplicationStatus();

  // FIXME: Build an error card

  if (error) {
    <div>{error}</div>;
  }

  if (data) {
    return (
      <div className="mt-20 w-full md:px-28">
        <Card className="w-full">
          <CardHeader>
            <div className="flex w-full justify-between">
              <div className="flex items-center gap-2">
                {/* <IoWarning className="h-12 w-12 shrink-0 text-orange-400" /> */}
                {getStatusText(data.applicationStatus).TitleIcon}
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {getStatusText(data.applicationStatus).title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {data.applicationType}
                  </p>

                  <p className="text-xs text-gray-500">Deadline: 31 Aug 2024</p>
                </div>
              </div>
              <Badge
                className={`shrink-0 ${
                  getStatusText(data.applicationStatus).color
                }`}
                variant={"secondary"}
              >
                {data.applicationStatus}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <Separator className="mb-4 h-1.5" />
            {data.programmePriorities.length === 0 ? (
              <div className="flex h-10 w-full items-center justify-center">
                No Programs selected
              </div>
            ) : (
              <div className="flex w-full flex-col gap-1 px-4">
                {data.programmePriorities.map((priority) => (
                  <div key={priority.programmeCode}>
                    <div className="flex w-full items-center gap-2">
                      <div className="shrink-0 text-3xl">
                        {priority.priority}
                      </div>
                      <div className="ms-3 sm:ms-4">
                        <p className="font-semibold text-gray-800 dark:text-gray-200 sm:mb-1">
                          {priority.programmeDetails.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {priority.programmeDetails.level}
                        </p>
                      </div>
                    </div>
                    <Separator className="my-5 h-0.5 last:hidden" />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardDescription className="flex items-center p-1 text-orange-600 dark:text-yellow-300">
            <LiaHandPointRightSolid className="mx-2 h-4 w-4 shrink-0" />
            {/* {getStatusText(data.applicationStatus).DescriptionIcon} */}
            {getStatusText(data.applicationStatus).description}
          </CardDescription>
        </Card>
        <Link href="/applicant_portal/edit">
          <Button className="mt-4 w-full">
            <MdModeEdit className="mr-2 h-5 w-5 shrink-0" />
            Edit Application
          </Button>
        </Link>
      </div>
    );
  }
};

export default Page;
