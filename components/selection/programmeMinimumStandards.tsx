"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FaTrash } from "react-icons/fa6";
import HeadingThree from "../typography/headingThree";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { ChangeEvent, useState } from "react";

import { z } from "zod";

interface Programme {
  programmeId: string;
  programmeName: string;
}

interface ProgrammeMinimumRequirements extends Programme {
  minimumGPA: number;
}

interface ProgrammeMinimumStandards {
  programmeList: ProgrammeMinimumRequirements[];
}

const programmes: Programme[] = [
  { programmeId: "1", programmeName: "Programme 1" },
  { programmeId: "2", programmeName: "Programme 2" },
  { programmeId: "3", programmeName: "Programme 3" },
  { programmeId: "4", programmeName: "Programme 4" },
  { programmeId: "5", programmeName: "Programme 5" },
  { programmeId: "6", programmeName: "Programme 6" },
  { programmeId: "7", programmeName: "Programme 7" },
  { programmeId: "8", programmeName: "Programme 8" },
  { programmeId: "9", programmeName: "Programme 9" },
  { programmeId: "10", programmeName: "Programme 10" },
];

const ProgrammeSchema = z.object({
  programmeId: z.string(),
  programmeName: z.string(),
});

const ProgrammeMinimumRequirementsSchema = ProgrammeSchema.extend({
  minimumGPA: z
    .number()
    .min(1, "GPA must be at least 1")
    .max(5, "GPA cannot exceed 5"),
});

const uniqueString = "~~~";

const ProgrammeMinimumStandards = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<
    ProgrammeMinimumRequirements[]
  >([]);
  const ProgrammeMinimumRequirementsArraySchema = z.array(
    ProgrammeMinimumRequirementsSchema,
  );

  const handleSelect = (currentValue: string) => {
    const [id, name] = currentValue.split(uniqueString);
    const selectedProgramme = programmes.find(
      (programme) => programme.programmeId === id,
    );

    if (selectedProgramme) {
      setSelectedItems([
        ...selectedItems,
        { ...selectedProgramme, minimumGPA: 0 },
      ]);
    }
    setOpen(false);
  };

  const handleDelete = (value: string) => {
    setSelectedItems(
      selectedItems.filter((item) => item.programmeId !== value),
    );
  };

  const handleGPAChange = (
    event: ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    setSelectedItems(
      selectedItems.map((item) =>
        item.programmeId === value
          ? { ...item, minimumGPA: parseFloat(event.target.value) }
          : item,
      ),
    );
  };

  const handleSubmit = () => {
    setErrorMessage("");
    selectedItems.forEach((item) => {
      const result = ProgrammeMinimumRequirementsSchema.safeParse(item);
      if (!result.success) {
        setErrorMessage(result.error.errors[0].message);
        return;
      }
    });

    console.log(selectedItems);
  };

  return (
    <div>
      <div className="my-3 flex w-full items-center justify-between">
        <HeadingThree>Programme Minimum Standards</HeadingThree>

        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="justify-between"
            >
              Select programme...
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Select programme..." className="h-9" />
              <CommandEmpty>No programme found.</CommandEmpty>
              <CommandGroup>
                {programmes
                  .filter(
                    (programme) =>
                      !selectedItems.find(
                        (item) => item.programmeId === programme.programmeId,
                      ),
                  )
                  .map((programme) => (
                    <CommandItem
                      key={programme.programmeId}
                      onSelect={handleSelect}
                    >
                      <span className="hidden">{`${programme.programmeId}${uniqueString}`}</span>
                      {programme.programmeName}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedItems.find(
                            (item) =>
                              item.programmeId === programme.programmeId,
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
        {selectedItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Label className="text-nowrap">{item.programmeName}</Label>
            <Input
              type="number"
              value={item.minimumGPA}
              className="max-w-20"
              onChange={(event) => handleGPAChange(event, item.programmeId)}
            />
            <Button
              onClick={() => handleDelete(item.programmeId)}
              size="icon"
              variant="destructive"
            >
              <FaTrash className="flex-shrink-0" />
            </Button>
          </div>
        ))}
      </div>
      {/* <div className="my-4 text-sm text-red-500">
        {errorMessage && errorMessage}
      </div>
      <Button onClick={handleSubmit}>submit</Button> */}
    </div>
  );
};

export default ProgrammeMinimumStandards;
