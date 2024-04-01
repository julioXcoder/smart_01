import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Rejected = () => {
  return (
    <div className="mx-auto my-10 flex justify-center">
      <Card className="max-w-lg overflow-hidden">
        <CardHeader>
          <AiOutlineCloseCircle className="h-7 w-7 text-gray-500 dark:text-gray-400" />
          <CardTitle>
            Unfortunately, Your Application Was Not Accepted
          </CardTitle>
          <CardDescription>
            We regret to inform you that your application was not accepted.
            Please review the feedback provided and consider reapplying.
          </CardDescription>
        </CardHeader>

        <CardDescription className="mt-auto flex divide-x divide-gray-200 overflow-hidden border-t border-gray-200 dark:divide-gray-700 dark:border-gray-700">
          <Link
            href={`/applicant-portal/view`}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-x-2 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            View
          </Link>
        </CardDescription>
      </Card>
    </div>
  );
};

export default Rejected;
