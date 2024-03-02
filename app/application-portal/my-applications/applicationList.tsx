import { ApplicantApplication } from "@/server/actions/application/schema";
import moment from "moment-timezone";
import { IoCalendar } from "react-icons/io5";
import ApplicationCard from "./applicationCard";

interface Props {
  applications: ApplicantApplication[];
}

const ApplicationList = ({ applications }: Props) => {
  return (
    <>
      {applications.length > 0 ? (
        <ol className="relative ml-4 border-s border-gray-200 dark:border-gray-700">
          {applications.map(
            ({ id, academicYearName, isExpired, status, end }) => (
              <li key={id} className="mb-10 ms-6">
                <span className="absolute -start-3 flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
                  <IoCalendar className="h-4 w-4 text-blue-800 dark:text-blue-300" />
                </span>
                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
                  {academicYearName} Academic Year Application
                </h3>
                <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  {isExpired ? (
                    <>The submission deadline has passed.</>
                  ) : (
                    <>
                      The submission deadline is on{" "}
                      <time className="text-red-400">
                        {moment(end)
                          .tz("Africa/Dar_es_Salaam")
                          .format("DD MMMM YYYY HH:mm:ss")}
                      </time>
                    </>
                  )}
                </time>
                <div>
                  <ApplicationCard
                    id={id}
                    status={status}
                    isExpired={isExpired}
                  />
                </div>
              </li>
            ),
          )}
        </ol>
      ) : (
        <div>No applications</div>
      )}
    </>
  );
};

export default ApplicationList;
