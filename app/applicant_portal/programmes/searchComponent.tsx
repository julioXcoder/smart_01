"use client";

import { Programme } from "@/server/actions/programmes/types";
import ProgrammeCard from "./programmeCard";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import DropdownSelect from "@/components/dropdownSelect";

interface Props {
  programmes: Programme[] | null;
}

const SearchComponent = ({ programmes }: Props) => {
  if (programmes) {
    return (
      <>
        {/* HEADER */}
        <div className="py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
          <div>
            <div className="relative">
              <input
                type="text"
                className="py-2 px-3 ps-11 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Search"
              />
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          <div>
            <div className="inline-flex gap-x-2">
              <DropdownSelect />
              <DropdownSelect />
            </div>
          </div>
        </div>
        {/* HEADER */}
        <div className="flex flex-col gap-6 mt-5">
          {programmes.map((programme, index) => (
            <ProgrammeCard key={index} programme={programme} />
          ))}
        </div>
      </>
    );
  }

  return <div>No Programmes available!</div>;
};

export default SearchComponent;
