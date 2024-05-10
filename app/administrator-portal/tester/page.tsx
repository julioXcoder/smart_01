"use client";

import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import {
  ProgrammeMinimumRequirements,
  ProgrammeMinimumRequirementsSchema,
  programmes,
  uniqueString,
} from "./data";

import HeadingThree from "@/components/typography/headingThree";
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
import PMRContent from "./pmrContent";
interface RequirementForm {
  name: string;
}

interface OptionProps {
  id: number;
}

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
    RequirementForm[]
  >([]);

  // PMR Helper
  const handleSelectPMR = (currentValue: string) => {
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
  };

  const handleDeletePMR = (value: string) => {
    setSelectedItemsPMR(
      selectedItemsPMR.filter((item) => item.programmeId !== value),
    );
  };

  const handleGPAChangePMR = (
    event: ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    setSelectedItemsPMR(
      selectedItemsPMR.map((item) =>
        item.programmeId === value
          ? { ...item, minimumGPA: parseFloat(event.target.value) }
          : item,
      ),
    );
  };

  const handleOpenPMR = (open: boolean) => {
    setOpenPMR(open);
  };

  const handleDeleteRequirement = (value: string) => {
    const requirement = selectedRequirements.find(
      (requirement) => requirement.name === value,
    );
    if (requirement) {
      // Remove the requirement from the selected requirements
      setSelectedRequirements((prevRequirements) =>
        prevRequirements.filter((r) => r.name !== requirement.name),
      );
      // Add the requirement back to the available requirements
      setAvailableRequirements((prevRequirements) => [
        ...prevRequirements,
        requirement,
      ]);
    }
  };

  // PMR Helper

  let myRequirements: RequirementForm[] = [
    {
      name: "programmeMinimumStandards",
    },
  ];

  const [availableRequirements, setAvailableRequirements] =
    useState<RequirementForm[]>(myRequirements);

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
    let allFormValues = {
      programmeMinimumStandards: {
        programmeList: [] as ProgrammeMinimumRequirements[],
      },
      // Initialize other properties as needed
    };

    selectedRequirements.forEach((requirement) => {
      // check for errors in the selected form
      let errors;
      switch (requirement.name) {
        case "programmeMinimumStandards":
          errors = (() => {
            const hasError = selectedItemsPMR.some((item) => {
              const result = ProgrammeMinimumRequirementsSchema.safeParse(item);
              if (!result.success) {
                return true;
              }
              return false;
            });
            return hasError;
          })();
          break;
        // Add more cases as needed
        default:
          errors = false;
      }

      if (errors) {
        alert("Error");
        hasErrors = true;
      } else {
        // get the values of the form and store them in allFormValues
        switch (requirement.name) {
          case "programmeMinimumStandards":
            allFormValues.programmeMinimumStandards.programmeList =
              selectedItemsPMR;
            break;
          // Add more cases as needed
        }
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
              <PMRContent
                handleDeletePMR={handleDeletePMR}
                handleGPAChangePMR={handleGPAChangePMR}
                handleSelectPMR={handleSelectPMR}
                openPMR={openPMR}
                programmes={programmes}
                selectedItemsPMR={selectedItemsPMR}
                onOpenPMR={handleOpenPMR}
                handleDeleteRequirement={handleDeleteRequirement}
              />
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
    if (options.length < 8) {
      const newOption = { id: options.length + 1 };
      setOptions([...options, newOption]);
    }
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
        <Button
          disabled={!(options.length < 8)}
          onClick={handleAddOption}
          className="mt-10"
        >
          Add Option
        </Button>
      </div>
    </div>
  );
};

export default Page;
