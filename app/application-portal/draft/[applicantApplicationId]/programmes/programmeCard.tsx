import { Button } from "@/components/ui/button";
import mustLogo from "@/public/logo/must.svg";
import { Programme } from "@/types/university";
import { getEducationLevel, getProgrammeType } from "@/utils/programme";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import Image from "next/image";

import { MdBook, MdEventNote } from "react-icons/md";

interface Props {
  programme: Programme;
  addProgramme: (programmeCode: string) => void;
  loading: boolean;
}

const ProgrammeCard = ({ programme, addProgramme, loading }: Props) => {
  return (
    <div className="group grid grid-cols-12 gap-2 overflow-hidden rounded-lg border bg-white p-4 shadow-md transition hover:shadow-lg dark:border-gray-700 dark:bg-slate-900 dark:shadow-slate-700/[.7]">
      {/* column 1 */}
      <div className="col-span-12 md:col-span-4">
        <div className="flex h-full flex-col sm:px-4">
          <div className="flex w-full items-center justify-start">
            <Image
              quality={100}
              className="mb-2 h-10 w-auto bg-white"
              src={mustLogo}
              alt="smart logo"
            />
          </div>
          <p className="font-semibold text-gray-800 dark:text-white">
            {/* <FaUniversity className="mr-2 inline" /> */}
            {programme.campus.name}
          </p>

          <p className="hidden text-xs capitalize text-gray-500 dark:text-gray-300 md:block">
            {programme.campus.country}, {programme.campus.location}
          </p>
          <p className="hidden text-xs capitalize text-gray-500 dark:text-gray-300 md:block">
            Department of {programme.department.name}
          </p>
        </div>
      </div>

      {/* column 2 */}
      <div className="col-span-12 md:col-span-5">
        <div className="flex h-full capitalize sm:px-4">
          <div className="flex h-full items-start gap-2">
            <MdBook className="mt-0.5 h-5 w-5 shrink-0" />
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  {getEducationLevel(programme.level)} {programme.name}
                </p>
                <div className="hidden md:block">
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Status: {getProgrammeType(programme.type)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Duration: {programme.duration} years
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Study language: {programme.language}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Tuition fee: {programme.tuitionFee} per year
                  </p>
                </div>
              </div>
              <Button
                variant="secondary"
                className="mt-2 hidden w-full md:flex"
              >
                <InfoCircledIcon className="mr-2" />
                More Information
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* column 3 */}
      <div className="col-span-12 md:col-span-3">
        <div className="h-full capitalize sm:px-4">
          {/* <div className="hidden md:block"> */}
          <div className="flex h-full items-start gap-2">
            <MdEventNote className="mt-0.5 h-5 w-5 shrink-0" />
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  Application deadline
                </p>
                {/* FIXME: Add valid deadline */}
                <div className="text-sm text-gray-500 dark:text-gray-300">
                  31 Aug 2024,23:59:59
                  <div>East Africa Time (EAT)</div>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Application fee: {programme.applicationFee}
                </p>
              </div>
              <div>
                <Button variant="secondary" className="mt-2 w-full md:hidden">
                  <InfoCircledIcon className="mr-2" />
                  More Information
                </Button>
                <Button
                  onClick={() => addProgramme(programme.code)}
                  disabled={loading}
                  className="mt-2 w-full"
                >
                  Apply Now!
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgrammeCard;
