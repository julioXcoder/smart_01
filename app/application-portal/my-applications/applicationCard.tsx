import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ApplicationStatus } from "@/types/application";
import { IconType } from "react-icons";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineInfoCircle,
  AiOutlineSearch,
} from "react-icons/ai";
import { FaExclamation } from "react-icons/fa6";
import { MdOutlineTimer } from "react-icons/md";
import Link from "next/link";

function getStatusText(applicationStatus: ApplicationStatus): {
  title: string;
  description: string;
  icon: IconType;
} {
  switch (applicationStatus) {
    case "DRAFT":
      return {
        title: "Your Application is in Draft Mode",
        description:
          "Important! - Your application hasn't been submitted yet! Please click on the 'Edit' button to complete it.",
        icon: AiOutlineInfoCircle,
      };
    case "ACCEPTED":
      return {
        title: "Congratulations, Your Application is Accepted!",
        description:
          "Your application has been accepted! Please click on the 'Continue' button to proceed.",
        icon: AiOutlineCheckCircle,
      };
    case "UNDER_REVIEW":
      return {
        title: "Your Application is Under Review",
        description:
          "Your application is currently being reviewed by our team. We appreciate your patience during this process.",
        icon: AiOutlineSearch,
      };
    case "REJECTED":
      return {
        title: "Unfortunately, Your Application Was Not Accepted",
        description:
          "We regret to inform you that your application was not accepted. Please review the feedback provided and consider reapplying.",
        icon: AiOutlineCloseCircle,
      };
    default:
      return {
        title: "",
        description: "",
        icon: FaExclamation,
      };
  }
}

interface Props {
  id: string;
  status: ApplicationStatus;
  isExpired: boolean;
}

const ApplicationCard = ({ id, status, isExpired }: Props) => {
  const Icon = getStatusText(status).icon;

  return (
    <Card className="max-w-lg overflow-hidden">
      {isExpired && status === "DRAFT" ? (
        <CardHeader>
          <MdOutlineTimer className="h-7 w-7 text-gray-500 dark:text-gray-400" />
          <CardTitle>Expired</CardTitle>
          <CardDescription>
            Application editing is closed for this cycle. If you wish to apply
            in the future, you’ll need to initiate a new application.
          </CardDescription>
        </CardHeader>
      ) : (
        <CardHeader>
          <Icon className="h-7 w-7 text-gray-500 dark:text-gray-400" />
          <CardTitle>{getStatusText(status).title}</CardTitle>
          <CardDescription>{getStatusText(status).description}</CardDescription>
        </CardHeader>
      )}

      <CardDescription className="mt-auto flex divide-x divide-gray-200 overflow-hidden border-t border-gray-200 dark:divide-gray-700 dark:border-gray-700">
        <Link
          href={`/application-portal/view/${id}`}
          className="inline-flex w-full cursor-pointer items-center justify-center gap-x-2 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        >
          View
        </Link>
        {!isExpired && status === "DRAFT" && (
          <Link
            href={`/application-portal/draft/${id}`}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-x-2 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            Edit
          </Link>
        )}
        {status === "ACCEPTED" && (
          <Link
            href={`/application-portal/student-onboarding/${id}`}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-x-2 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            continue
          </Link>
        )}
      </CardDescription>
    </Card>
  );
};

export default ApplicationCard;
