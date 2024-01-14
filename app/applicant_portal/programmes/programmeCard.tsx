import Image from "next/image";
import { Button } from "@/components/ui/button";
import mustLogo from "@/public/logo/must.svg";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Programme } from "@/server/actions/programmes/types";

interface Props {
  programme: Programme;
}

const ProgrammeCard = ({ programme }: Props) => {
  return (
    <div className="grid grid-cols-12 gap-2 group bg-white border shadow-md rounded-lg overflow-hidden hover:shadow-lg p-4 transition dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
      {/* column 1 */}
      <div className="col-span-12 md:col-span-4">
        <div className="flex flex-col h-full sm:px-4">
          <div className="flex w-full items-center justify-start">
            <Image
              quality={100}
              className="h-10 w-auto mb-2"
              src={mustLogo}
              alt="smart logo"
            />
          </div>
          <p className="font-semibold text-gray-800 dark:text-white">
            {programme.campus.name}
          </p>
          {/* FIXME: Add country in campus model */}
          <p className="text-xs capitalize text-gray-500 dark:text-gray-300">
            Tanzania, {programme.campus.location}
          </p>
          <p className="text-xs capitalize text-gray-500 dark:text-gray-300">
            Department of {programme.department.name}
          </p>
        </div>
      </div>

      {/* column 2 */}
      <div className="col-span-12 md:col-span-5">
        <div className="flex flex-col justify-between capitalize h-full sm:px-4">
          <div>
            <p className="font-semibold text-gray-800 dark:text-white">
              {programme.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {programme.level.toLowerCase()}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {programme.type}, {programme.duration} years
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Study language: {programme.language}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Tuition fee: {programme.tuitionFee} per year
            </p>
          </div>
          <Button variant="secondary" className="w-full mt-2">
            <InfoCircledIcon className="mr-2" />
            More Information
          </Button>
        </div>
      </div>

      {/* column 3 */}
      <div className="col-span-12 md:col-span-3">
        <div className="flex flex-col justify-between capitalize h-full sm:px-4">
          <div className="hidden md:block">
            <p className="font-semibold text-gray-800 dark:text-white">
              Application deadline
            </p>
            {/* FIXME: Add valid deadline */}
            <p className="text-sm text-gray-500 dark:text-gray-300">
              31 Aug 2024, 23:59:59 Europe/Warsaw time
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              Application fee: {programme.applicationFee}
            </p>
          </div>
          <Button className="w-full mt-2">Apply Now!</Button>
        </div>
      </div>
    </div>
  );
};

export default ProgrammeCard;
