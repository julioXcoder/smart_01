"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import useArrayToggle from "@/hooks/useArrayToggle";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Muted from "@/components/typography/muted";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import {
  ApplicationDetails,
  ApplicationStatus,
  ProgrammeType,
} from "@prisma/client";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

enum DateFilterOption {
  GreaterThan = "greaterThan",
  LessThan = "lessThan",
  EqualTo = "equalTo",
  Between = "between",
}

interface IDateFilterState {
  dateFilterOption: DateFilterOption;
  dateInput: Date | undefined;
  dateInputRangeStart: Date | undefined;
  dateInputRangeEnd: Date | undefined;
}

const Page = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  const [selectedApplicationStatuses, toggleApplicationStatus] = useArrayToggle(
    Object.values(ApplicationStatus),
  );
  const [selectedApplicationTypes, toggleApplicationType] = useArrayToggle(
    Object.values(ProgrammeType),
  );

  const applicationStatuses = Object.values(ApplicationStatus);
  const applicationProgrammeTypes = Object.values(ProgrammeType);

  const [dateFilter, setDateFilter] = useState<IDateFilterState>({
    dateFilterOption: DateFilterOption.GreaterThan,
    dateInput: undefined,
    dateInputRangeStart: undefined,
    dateInputRangeEnd: undefined,
  });

  const date: Date | undefined = new Date();
  const dateRange: DateRange | undefined = {
    from: new Date(), // Now
    to: addDays(new Date(), 3), // 3 days from now
  };

  const filters = [
    {
      title: "status",
      content: (
        <div className="flex w-full flex-col gap-3">
          <Muted>Application status</Muted>
          <div className="space-y-2 ps-2">
            {applicationStatuses.map((status, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedApplicationStatuses.includes(status)}
                  onCheckedChange={() => toggleApplicationStatus(status)}
                  id={status}
                />
                <label
                  htmlFor={status}
                  className="text-sm font-medium capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {status.replace("_", " ").toLowerCase()}
                </label>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "application type",
      content: (
        <div className="flex w-full flex-col gap-3">
          <Muted>Application type</Muted>
          <div className="space-y-2 ps-2">
            {applicationProgrammeTypes.map((type, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  checked={selectedApplicationTypes.includes(type)}
                  onCheckedChange={() => toggleApplicationType(type)}
                  id={type}
                />
                <label
                  htmlFor={type}
                  className="text-sm font-medium capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {type.replace("_", " ").toLowerCase()}
                </label>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "created at",
      content: (
        <div className="flex w-full flex-col gap-3">
          <Muted>Created at is</Muted>
          <RadioGroup
            value={dateFilter.dateFilterOption}
            onValueChange={(value: DateFilterOption) =>
              setDateFilter({ ...dateFilter, dateFilterOption: value })
            }
            className="ps-2"
          >
            {Object.values(DateFilterOption).map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option} className="capitalize">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {dateFilter.dateFilterOption != DateFilterOption.Between ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(value) =>
                    setDateFilter({ ...dateFilter, dateInput: value })
                  }
                  // onSelect={}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          ) : (
            <div className={cn("grid gap-2", className)}>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-[300px] justify-start text-left font-normal",
                      !dateRange && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={(value) =>
                      setDateFilter({
                        ...dateFilter,
                        dateInputRangeStart: value?.from,
                        dateInputRangeEnd: value?.to,
                      })
                    }
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      ),
    },
  ];

  const applyDateFilter = (
    data: ApplicationDetails[],
  ): ApplicationDetails[] => {
    switch (dateFilter.dateFilterOption) {
      case DateFilterOption.GreaterThan:
        return dateFilter.dateInput
          ? data.filter(
              (item) =>
                new Date(item.createdAt) > new Date(dateFilter.dateInput!),
            )
          : data;
      case DateFilterOption.LessThan:
        return dateFilter.dateInput
          ? data.filter(
              (item) =>
                new Date(item.createdAt) < new Date(dateFilter.dateInput!),
            )
          : data;
      case DateFilterOption.EqualTo:
        return dateFilter.dateInput
          ? data.filter(
              (item) =>
                new Date(item.createdAt).toDateString() ===
                new Date(dateFilter.dateInput!).toDateString(),
            )
          : data;
      case DateFilterOption.Between:
        return dateFilter.dateInputRangeStart && dateFilter.dateInputRangeEnd
          ? data.filter(
              (item) =>
                new Date(item.createdAt) >=
                  new Date(dateFilter.dateInputRangeStart!) &&
                new Date(item.createdAt) <=
                  new Date(dateFilter.dateInputRangeEnd!),
            )
          : data;
      default:
        return data;
    }
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">add filter</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {filters.map(({ title, content }, index) => (
              <DropdownMenuSub key={index}>
                <DropdownMenuSubTrigger>{title}</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="flex flex-col gap-5 px-3 py-2">
                    <div>{content}</div>
                    <div className="flex w-full items-center gap-2">
                      <Button variant="secondary" className="flex-1">
                        cancel
                      </Button>
                      <Button className="w-3/4">apply filter</Button>
                    </div>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <div>
        {selectedApplicationTypes.map((item, index) => (
          <div key={index} className="mx-2">
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
