"use client";

import { useState, ChangeEvent } from "react";
import {
  Programme,
  Campus,
  EducationLevel,
} from "@/server/actions/programmes/types";
import ProgrammeCard from "./programmeCard";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import DropdownSelect from "@/components/dropdownSelect";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Checked = DropdownMenuCheckboxItemProps["checked"];

interface Props {
  programmes: Programme[] | null;
}

export function getLevelDisplayText(level: EducationLevel): string {
  switch (level) {
    case EducationLevel.DIPLOMA:
      return "Diploma";
    case EducationLevel.CERTIFICATE:
      return "Certificate";
    case EducationLevel.BACHELOR:
      return "Bachelor";
    case EducationLevel.MASTERS:
      return "Masters";
    case EducationLevel.PHD:
      return "PhD";
    default:
      return "";
  }
}

const SearchComponent = ({ programmes }: Props) => {
  const [selectedLevels, setSelectedLevels] = useState<EducationLevel[]>([]);
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
            new Map()
          )
          .values()
      )
    : [];

  const levels: EducationLevel[] = Object.values(EducationLevel);

  const filterProgrammes = () => {
    let filtered = programmes;

    // Apply campus filter
    if (selectedCampuses.length > 0) {
      filtered =
        filtered?.filter((programme) =>
          selectedCampuses.some(
            (selectedCampus) => programme.campus.id === selectedCampus.id
          )
        ) || null;
    }

    // Apply level filter
    if (selectedLevels.length > 0) {
      filtered =
        filtered?.filter((programme) =>
          selectedLevels.includes(programme.level)
        ) || null;
    }

    setFilteredProgrammes(filtered);
  };

  const handleCampusChange = (selectedCampus: Campus) => {
    let updatedSelectedCampuses;
    if (selectedCampuses.find((campus) => campus.id === selectedCampus.id)) {
      // If the campus is already selected, remove it from the array
      updatedSelectedCampuses = selectedCampuses.filter(
        (campus) => campus.id !== selectedCampus.id
      );
    } else {
      // If the campus is not selected, add it to the array
      updatedSelectedCampuses = [...selectedCampuses, selectedCampus];
    }
    setSelectedCampuses(updatedSelectedCampuses);
    filterProgrammes();
  };

  const handleLevelChange = (selectedLevel: EducationLevel) => {
    let updatedSelectedLevels;
    if (selectedLevels.includes(selectedLevel)) {
      // If the level is already selected, remove it from the array
      updatedSelectedLevels = selectedLevels.filter(
        (level) => level !== selectedLevel
      );
    } else {
      // If the level is not selected, add it to the array
      updatedSelectedLevels = [...selectedLevels, selectedLevel];
    }
    setSelectedLevels(updatedSelectedLevels);
    if (updatedSelectedLevels.length > 0) {
      setFilteredProgrammes(
        programmes?.filter((programme) =>
          updatedSelectedLevels.includes(programme.level)
        ) || null
      );
    } else {
      setFilteredProgrammes(programmes);
    }
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (event.target.value) {
      setFilteredProgrammes(
        programmes?.filter((programme) =>
          programme.name
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
        ) || null
      );
    } else {
      setFilteredProgrammes(programmes);
    }
  };

  if (programmes) {
    return (
      <>
        {/* HEADER */}
        <div className="py-4 grid gap-3 md:flex md:justify-between md:items-center border-b border-gray-200 dark:border-gray-700">
          <div>
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
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
              <div>
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
                          (selectedCampus) => selectedCampus.id === campus.id
                        )}
                        onCheckedChange={() => handleCampusChange(campus)}
                      >
                        {campus.shortHand} - {campus.location}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">Select Levels</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Education Levels</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {levels.map((level) => (
                      <DropdownMenuCheckboxItem
                        key={level}
                        checked={selectedLevels.includes(level)}
                        onCheckedChange={() => handleLevelChange(level)}
                      >
                        {getLevelDisplayText(level)}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
        {/* HEADER */}
        <div className="flex flex-col gap-6 mt-5">
          {filteredProgrammes?.map((programme, index) => (
            <ProgrammeCard key={index} programme={programme} />
          ))}
        </div>
      </>
    );
  }

  return <div>No Programmes available!</div>;
};

export default SearchComponent;
