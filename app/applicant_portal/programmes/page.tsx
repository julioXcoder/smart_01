import React from "react";
import { getAllProgrammes } from "@/server/actions/programmes";
import SearchComponent from "./searchComponent";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import mustLogo from "@/public/logo/must.svg";
import { InfoCircledIcon } from "@radix-ui/react-icons";

const fakeProgram = {
  code: "PROG123",
  programmeName: "Computer Science",
  level: "BACHELOR",
  duration: 36,
  type: "FULL_TIME",
  language: "English",
  departmentId: "DEPT456",
  tuitionFee: 15000,
  applicationFee: 50,
  qualification: "High School Diploma",
  applicationDeadline: "2024-08-15",
  departmentName: "School of Computer Science",
  location: "Cityville",
  collegeName: "Tech University",
};

const Page = async () => {
  // const { data, error } = await getAllProgrammes();

  // if (error) return <div className="mt-20">{error}</div>;

  return (
    <div>
      <div className="mt-20">
        {/* {data?.map((item, index) => (
          <div key={index}>
            {item.name},{item.campus.location},{item.level}
          </div>
        ))} */}
      </div>
      <div className="mt-10">
        <SearchComponent />
        <div className="grid grid-cols-12 gap-2 max-w-5xl group bg-white border shadow-sm rounded-xl overflow-hidden hover:shadow p-4 transition dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          {/* column 1 */}
          <div className="col-span-12 md:col-span-4 md:border-r-2 dark:border-gray-700">
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
                MBEYA UNIVERSITY OF SCIENCE AND TECHNOLOGY
              </p>
              <p className="text-xs capitalize text-gray-500 dark:text-gray-300">
                Tanzania, MBEYA
              </p>
              <p className="text-xs capitalize text-gray-500 dark:text-gray-300">
                Department of Computer Science and Engineering
              </p>
            </div>
          </div>

          {/* column 2 */}
          <div className="col-span-12 md:col-span-5 md:border-r-2 dark:border-gray-700">
            <div className="flex flex-col justify-between capitalize h-full sm:px-4">
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  Computer Science
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  FULL-TIME, 3 years
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  diploma
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Study language: English
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Tuition fee: €1,400 per year
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
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  31 Aug 2024, 23:59:59 Europe/Warsaw time
                </p>
              </div>
              <Button className="w-full mt-2">Apply Now! - 2023/2024</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
