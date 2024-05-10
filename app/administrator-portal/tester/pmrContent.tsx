import { Button } from "@/components/ui/button";
import HeadingThree from "@/components/typography/headingThree";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { FaTrash } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChangeEvent } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { ProgrammeMinimumRequirements, uniqueString, Programme } from "./data";

interface Props {
  openPMR: boolean;
  onOpenPMR: ((open: boolean) => void) | undefined;
  selectedItemsPMR: ProgrammeMinimumRequirements[];
  programmes: Programme[];
  handleDeletePMR: (value: string) => void;
  handleSelectPMR: (currentValue: string) => void;
  handleDeleteRequirement: (value: string) => void;
  handleGPAChangePMR: (
    event: ChangeEvent<HTMLInputElement>,
    value: string,
  ) => void;
}

const PMRContent = ({
  openPMR,
  onOpenPMR,
  handleGPAChangePMR,
  selectedItemsPMR,
  programmes,
  handleSelectPMR,
  handleDeletePMR,
  handleDeleteRequirement,
}: Props) => {
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Minimum GPA Criteria for Programmes</CardTitle>
          <div className="flex items-center gap-2">
            <Popover open={openPMR} onOpenChange={onOpenPMR}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openPMR}
                  className="justify-between"
                >
                  Select programmes
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
            <Button
              onClick={() =>
                handleDeleteRequirement("programmeMinimumStandards")
              }
              size="icon"
              variant="destructive"
            >
              <FaTrash className="flex-shrink-0" />
            </Button>
          </div>
        </CardHeader>
        {selectedItemsPMR.length != 0 && (
          <CardContent className="flex flex-col gap-2">
            {selectedItemsPMR.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Label className="text-nowrap">{item.programmeName}</Label>
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
          </CardContent>
        )}
      </Card>
    </>
  );
};

export default PMRContent;
