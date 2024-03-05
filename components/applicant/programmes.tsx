"use client";

import { Button } from "@/components/ui/button";
import { addApplicantProgrammePriority } from "@/server/actions/application";
import { ProgrammeLevel } from "@/types/application";
import { Programme } from "@/types/draftProgrammes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { MdArrowBack } from "react-icons/md";
import ProgrammeCard from "./programmeCard";

const levels: ProgrammeLevel[] = [
  "CERTIFICATE",
  "DIPLOMA",
  "BACHELOR",
  "MASTERS",
  "PHD",
];

interface Props {
  programmes: Programme[] | null;
  applicantApplicationId: string;
  onGotoItem: (itemIndex: number) => void;
}

const Programmes = ({
  programmes,
  applicantApplicationId,
  onGotoItem,
}: Props) => {
  const [loading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredProgrammes, setFilteredProgrammes] = useState<
    Programme[] | null
  >(programmes);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (event.target.value) {
      setFilteredProgrammes(
        programmes?.filter((programme) =>
          programme.name
            .toLowerCase()
            .includes(event.target.value.toLowerCase()),
        ) || null,
      );
    } else {
      setFilteredProgrammes(programmes);
    }
  };

  const handleAddApplicantProgramme = async (programmeCode: string) => {
    setIsLoading(true);

    const errorMessage = await addApplicantProgrammePriority(
      programmeCode,
      applicantApplicationId,
    );

    if (errorMessage) {
      toast.error(errorMessage, { duration: 6000 });
      setIsLoading(false);
      return;
    }

    onGotoItem(0);
  };

  if (programmes) {
    return (
      <>
        {/* HEADER */}
        <div className="grid gap-3 border-b border-gray-200 py-4 dark:border-gray-700 md:flex md:items-center md:justify-between">
          <div>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className="block w-full rounded-lg border-gray-200 px-3 py-2 ps-11 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
                placeholder="Search"
              />
              <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          <div>
            <div className="inline-flex gap-x-2">
              <Button onClick={() => onGotoItem(0)} variant={"outline"}>
                <MdArrowBack className="mr-1 h-4 w-4 shrink-0" />
                Return to Edit
              </Button>
            </div>
          </div>
        </div>
        {/* HEADER */}
        <div className="mt-5 flex flex-col gap-6">
          {filteredProgrammes?.map((programme, index) => (
            <ProgrammeCard
              addProgramme={handleAddApplicantProgramme}
              loading={loading}
              key={index}
              programme={programme}
            />
          ))}
        </div>
      </>
    );
  }

  return <div>No Programmes available!</div>;
};

export default Programmes;
