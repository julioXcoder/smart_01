"use client";

import { useState, ChangeEvent } from "react";
import { Programme, Campus } from "@/server/actions/programmes/types";
import { ProgrammeLevelName } from "@/types/application";
import ProgrammeCard from "./programmeCard";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { MdArrowBack } from "react-icons/md";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { getLevelDisplayText } from "@/utils/programme";
import Link from "next/link";
import { addApplicantProgrammePriority } from "@/server/actions/applicant";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const levels: ProgrammeLevelName[] = [
  "CERTIFICATE",
  "DIPLOMA",
  "BACHELOR",
  "MASTERS",
  "PHD",
];

interface Props {
  programmes: Programme[] | null;
  applicantApplicationId: string;
}

const SearchComponent = ({ programmes, applicantApplicationId }: Props) => {
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);
  const [selectedLevels, setSelectedLevels] = useState<ProgrammeLevelName[]>(
    [],
  );
  const [selectedCampuses, setSelectedCampuses] = useState<Campus[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredProgrammes, setFilteredProgrammes] = useState<
    Programme[] | null
  >(programmes);

  const campuses: Campus[] = programmes
    ? Array.from(
        programmes
          .reduce(
            (map, programme) => map.set(programme.campus.id, programme.campus),
            new Map(),
          )
          .values(),
      )
    : [];

  const filterProgrammes = () => {
    let filtered = programmes;

    // Apply campus filter
    if (selectedCampuses.length > 0) {
      filtered =
        filtered?.filter((programme) =>
          selectedCampuses.some(
            (selectedCampus) => programme.campus.id === selectedCampus.id,
          ),
        ) || null;
    }

    // Apply level filter
    if (selectedLevels.length > 0) {
      filtered =
        filtered?.filter((programme) =>
          selectedLevels.includes(programme.level),
        ) || null;
    }

    setFilteredProgrammes(filtered);
  };

  // const handleCampusChange = (selectedCampus: Campus) => {
  //   let updatedSelectedCampuses;
  //   if (selectedCampuses.find((campus) => campus.id === selectedCampus.id)) {
  //     // If the campus is already selected, remove it from the array
  //     updatedSelectedCampuses = selectedCampuses.filter(
  //       (campus) => campus.id !== selectedCampus.id,
  //     );
  //   } else {
  //     // If the campus is not selected, add it to the array
  //     updatedSelectedCampuses = [...selectedCampuses, selectedCampus];
  //   }
  //   setSelectedCampuses(updatedSelectedCampuses);
  //   filterProgrammes();
  // };

  // const handleLevelChange = (selectedLevel: ProgrammeLevelName) => {
  //   let updatedSelectedLevels: ProgrammeLevelName[];
  //   if (selectedLevels.includes(selectedLevel)) {
  //     // If the level is already selected, remove it from the array
  //     updatedSelectedLevels = selectedLevels.filter(
  //       (level) => level !== selectedLevel,
  //     );
  //   } else {
  //     // If the level is not selected, add it to the array
  //     updatedSelectedLevels = [...selectedLevels, selectedLevel];
  //   }
  //   setSelectedLevels(updatedSelectedLevels);
  //   if (updatedSelectedLevels.length > 0) {
  //     setFilteredProgrammes(
  //       programmes?.filter((programme) =>
  //         updatedSelectedLevels.includes(programme.level),
  //       ) || null,
  //     );
  //   } else {
  //     setFilteredProgrammes(programmes);
  //   }
  // };

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
    const { data: redirect, error } = await addApplicantProgrammePriority(
      programmeCode,
      applicantApplicationId,
    );

    if (error) {
      toast.error(error, { duration: 6000 });
    } else if (redirect) {
      router.push(redirect);
    }

    setIsLoading(false);
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
              {/* <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Select Campus</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Available Campuses</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {campuses.map((campus) => (
                      <DropdownMenuCheckboxItem
                        key={campus.id}
                        checked={selectedCampuses.some(
                          (selectedCampus) => selectedCampus.id === campus.id,
                        )}
                        onCheckedChange={() => handleCampusChange(campus)}
                      >
                        {campus.shortHand} - {campus.location}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div> */}
              <Link
                href={`/applicant_portal/edit_application/${applicantApplicationId}`}
              >
                <Button variant={"outline"}>
                  <MdArrowBack className="mr-1 h-4 w-4 shrink-0" />
                  Return to Edit
                </Button>
              </Link>
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

export default SearchComponent;
