import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { AiOutlineCheckCircle } from "react-icons/ai";

const Accepted = () => {
  return (
    <div className="mx-auto my-10 flex justify-center">
      <Card className="max-w-lg overflow-hidden">
        <CardHeader>
          <AiOutlineCheckCircle className="h-7 w-7 text-gray-500 dark:text-gray-400" />
          <CardTitle>Congratulations, Your Application is Accepted!</CardTitle>
          <CardDescription>
            Your application has been accepted! Please click on the
            &apos;Continue&apos; button to proceed.
          </CardDescription>
        </CardHeader>

        <CardDescription className="mt-auto flex divide-x divide-gray-200 overflow-hidden border-t border-gray-200 dark:divide-gray-700 dark:border-gray-700">
          <Link
            href={`/application-portal/student-onboarding/`}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-x-2 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          >
            continue
          </Link>
        </CardDescription>
      </Card>
    </div>
  );
};

export default Accepted;
