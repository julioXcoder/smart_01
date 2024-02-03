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

function getStatusText(applicationStatus: ApplicationStatusName): string {
  switch (applicationStatus) {
    case "DRAFT":
      return "Your application is currently in draft status. To continue with your application process, please click the 'Edit' button below and complete all necessary fields.";
    case "ACCEPTED":
      return "Congratulations! Your application has been accepted. To proceed with the next steps, please click the 'Continue Application' button below.";
    case "UNDER_REVIEW":
      return "Your application is currently under review. We appreciate your patience as we carefully consider your submission. You will be notified once there is an update.";
    case "REJECTED":
      return "We regret to inform you that your application has not been successful this time. We encourage you to apply again in the future when applications reopen.";
    default:
      return "Oops! It seems like we encountered an unexpected status for your application. Please check your application status or contact our support team for further assistance.";
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
                <IoWarning className="h-12 w-12 shrink-0 text-orange-400" />
                <div>
                  <p className="font-semibold text-gray-800 dark:text-gray-200">
                    {getStatusText(data.applicationStatus)}
                  </p>
                  <p className="text-xs text-gray-500">Deadline: 31 Aug 2024</p>
                </div>
              </div>
              <Badge className="shrink-0" variant={"secondary"}>
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
            <LiaHandPointRightSolid className="mx-2 h-4 w-4 shrink-0" />{" "}
            Important! The application is currently not submitted! Please click
            on the &apos;Edit application&apos; button to do so.
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
