import ApplicationCard from "@/components/applicant/applicationCard";
import { IoCalendar } from "react-icons/io5";

const Page = () => {
  return (
    <div>
      <ol className="relative ml-4 border-s border-gray-200 dark:border-gray-700">
        <li className="mb-10 ms-6">
          <span className="absolute -start-3 flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
            <IoCalendar className="h-4 w-4 text-blue-800 dark:text-blue-300" />
          </span>
          <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            2023-2024 Academic Year Application
          </h3>
          <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            The submission deadline is on{" "}
            <time className="text-red-400">January 13th, 2022.</time>
          </time>
          <div>
            <ApplicationCard status="REJECTED" isExpired={true} />
          </div>
        </li>
      </ol>
    </div>
  );
};

export default Page;
