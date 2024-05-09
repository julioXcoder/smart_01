"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { ChangeEvent, useEffect, useState, useCallback } from "react";
import { ProgrammeMinimumRequirements, programmes, uniqueString } from "./data";

import HeadingThree from "@/components/typography/headingThree";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ProgrammeMinimumStandards,
  Requirement,
} from "@/utils/examination/necta/selection_";
import { FaTrash } from "react-icons/fa6";

interface RequirementForm<T> {
  name: string;
  // content: () => JSX.Element;
  checkErrors: () => boolean;
  getValues: () => T;
}

interface OptionProps {
  id: number;
}

type RequirementType = RequirementForm<Requirement>;

// TODO: use combobox not select

const Option: React.FC<OptionProps> = ({ id }) => {
  // PMR
  const [openPMR, setOpenPMR] = useState<boolean>(false);
  const [errorMessagePMR, setErrorMessagePMR] = useState<string>("");
  const [selectedItemsPMR, setSelectedItemsPMR] = useState<
    ProgrammeMinimumRequirements[]
  >([]);
  // PMR
  const [selectedRequirements, setSelectedRequirements] = useState<
    RequirementType[]
  >([]);

  // PMR Helper
  const handleSelectPMR = useCallback(
    (currentValue: string) => {
      const [id, name] = currentValue.split(uniqueString);
      const selectedProgramme = programmes.find(
        (programme) => programme.programmeId === id,
      );

      if (selectedProgramme) {
        setSelectedItemsPMR([
          ...selectedItemsPMR,
          { ...selectedProgramme, minimumGPA: 0 },
        ]);
      }
      setOpenPMR(false);
    },
    [selectedItemsPMR],
  );

  const handleDeletePMR = useCallback(
    (value: string) => {
      setSelectedItemsPMR(
        selectedItemsPMR.filter((item) => item.programmeId !== value),
      );
    },
    [selectedItemsPMR],
  );

  const handleGPAChangePMR = useCallback(
    (event: ChangeEvent<HTMLInputElement>, value: string) => {
      setSelectedItemsPMR(
        selectedItemsPMR.map((item) =>
          item.programmeId === value
            ? { ...item, minimumGPA: parseFloat(event.target.value) }
            : item,
        ),
      );
    },
    [selectedItemsPMR],
  );

  // PMR Helper

  const myRequirements: RequirementType[] = [
    {
      name: "programmeMinimumStandards",
      checkErrors: () => {
        return true;
      },
      getValues: () => {
        return { programmeList: selectedItemsPMR } as ProgrammeMinimumStandards;
      },
    },
  ];

  const [availableRequirements, setAvailableRequirements] =
    useState<RequirementType[]>(myRequirements);

  const handleRequirementSelect = (value: string) => {
    const requirement = availableRequirements.find(
      (requirement) => requirement.name === value,
    );
    if (requirement) {
      setSelectedRequirements([...selectedRequirements, requirement]);
      // remove the selected form from the available forms
      setAvailableRequirements((prevRequirements) =>
        prevRequirements.filter((r) => r.name !== requirement.name),
      );
    }
  };

  const handleSave = () => {
    let hasErrors = false;
    console.log("Clicked!!");
    const allFormValues = {};
    selectedRequirements.forEach((requirement) => {
      // check for errors in the selected form
      const errors = requirement.checkErrors();
      if (errors) {
        hasErrors = true;
      } else {
        // get the values of the form and store them in allFormValues
        const allFormValues = requirement.getValues();
      }
    });
    if (!hasErrors) {
      console.log(`Option ID: ${id}`);
      console.log(`Form Values: `, allFormValues);
    }
  };

  return (
    <div>
      {availableRequirements.length != 0 && (
        <Select onValueChange={handleRequirementSelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a requirement" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {availableRequirements.map((requirement) => (
                <SelectItem key={requirement.name} value={requirement.name}>
                  {requirement.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}

      {selectedRequirements.map((requirement) => {
        switch (requirement.name) {
          case "programmeMinimumStandards":
            return (
              <>
                <div className="my-3 flex w-full items-center justify-between">
                  <HeadingThree>Programme Minimum Standards</HeadingThree>
                  <Popover open={openPMR} onOpenChange={setOpenPMR}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openPMR}
                        className="justify-between"
                      >
                        Select programme...
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Select programme..."
                          className="h-9"
                        />
                        <CommandEmpty>No programme found.</CommandEmpty>
                        <CommandGroup>
                          {programmes
                            .filter(
                              (programme) =>
                                !selectedItemsPMR.find(
                                  (item) =>
                                    item.programmeId === programme.programmeId,
                                ),
                            )
                            .map((programme) => (
                              <CommandItem
                                key={programme.programmeId}
                                onSelect={handleSelectPMR}
                              >
                                <span className="hidden">{`${programme.programmeId}${uniqueString}`}</span>
                                {programme.programmeName}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    selectedItemsPMR.find(
                                      (item) =>
                                        item.programmeId ===
                                        programme.programmeId,
                                    )
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex flex-col gap-2">
                  {selectedItemsPMR.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Label className="text-nowrap">
                        {item.programmeName}
                      </Label>
                      <Input
                        type="number"
                        value={item.minimumGPA}
                        className="max-w-20"
                        onChange={(event) =>
                          handleGPAChangePMR(event, item.programmeId)
                        }
                      />
                      <Button
                        onClick={() => handleDeletePMR(item.programmeId)}
                        size="icon"
                        variant="destructive"
                      >
                        <FaTrash className="flex-shrink-0" />
                      </Button>
                    </div>
                  ))}
                </div>
              </>
            );
          // Add more cases as needed
          default:
            return null;
        }
      })}
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

const Page = () => {
  const [options, setOptions] = useState<Array<{ id: number }>>([{ id: 1 }]);

  const handleAddOption = () => {
    const newOption = { id: options.length + 1 };
    setOptions([...options, newOption]);
  };

  return (
    <div>
      <div className="flex flex-col gap-8">
        {options.map((option) => (
          <div key={option.id}>
            <HeadingThree>Option #{option.id}</HeadingThree>
            <div className="m-4 ps-5">
              <Option id={option.id} />
            </div>
          </div>
        ))}
        <Button onClick={handleAddOption} className="mt-10">
          Add Option
        </Button>
      </div>
    </div>
  );
};

export default Page;
