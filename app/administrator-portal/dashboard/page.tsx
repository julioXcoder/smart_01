"use client";

import Muted from "@/components/typography/muted";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useApplicationDetailsFilter, {
  DateFilterOption,
  Filter,
} from "@/hooks/useApplicationDetailsFilter";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { FaTrash } from "react-icons/fa6";
import { applicants } from "../applications/columns";

const Page = ({ className }: React.HTMLAttributes<HTMLDivElement>) => {
  const {
    selectedApplicationStatuses,
    toggleApplicationStatus,
    selectedApplicationTypes,
    toggleApplicationType,
    dateFilter,
    setDateFilter,
    applyFilters,
    resetFilters,
    date,
    setDate,
    dateRange,
    setDateRange,
    isOpen,
    setIsOpen,
    pickedFilters,
    setPickedFilters,
    isFilterOpen,
    setIsFilterOpen,
    filteredData,
    setFilteredData,
    applicationStatuses,
    applicationProgrammeTypes,
    handleOpenChange,
  } = useApplicationDetailsFilter(applicants);

  const filters: Filter[] = [
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
      descriptionContent: (
        <>{`Status: ${selectedApplicationStatuses.join(", ")}`}</>
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
      descriptionContent: (
        <>{`Status: ${selectedApplicationTypes.join(", ")}`}</>
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
                  onSelect={(value) => {
                    setDate(value);
                    setDateFilter({ ...dateFilter, dateInput: value });
                  }}
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
                    onSelect={(value) => {
                      setDateRange(value);
                      setDateFilter({
                        ...dateFilter,
                        dateInputRangeStart: value?.from,
                        dateInputRangeEnd: value?.to,
                      });
                    }}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      ),
      descriptionContent: (
        <>
          {"between" != dateFilter.dateFilterOption ? (
            <>
              created at is {dateFilter.dateFilterOption}{" "}
              {dateFilter.dateInput
                ? dateFilter.dateInput.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "2-digit",
                  })
                : null}
            </>
          ) : (
            <>
              created at is {dateFilter.dateFilterOption}{" "}
              {dateFilter.dateInputRangeStart
                ? dateFilter.dateInputRangeStart.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "2-digit",
                  })
                : null}{" "}
              and{" "}
              {dateFilter.dateInputRangeEnd
                ? dateFilter.dateInputRangeEnd.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "2-digit",
                  })
                : null}
            </>
          )}
        </>
      ),
    },
  ];

  const pickFilter = (filter: Filter) => {
    if (!pickedFilters.find((s) => s.title === filter.title)) {
      setPickedFilters((prev) => [...prev, filter]);
    }
  };

  const removeFilter = (filter: Filter) => {
    setPickedFilters((prev) => prev.filter((s) => s.title !== filter.title));
  };

  const handleApplyFilter = (filter: Filter) => {
    pickFilter(filter);
    setFilteredData(applyFilters());
    setIsOpen(false);
  };

  return (
    <div>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">add filter</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {filters.map((filter, index) => (
              <DropdownMenuSub key={index}>
                <DropdownMenuSubTrigger
                  disabled={pickedFilters.some(
                    (item) => item.title === filter.title,
                  )}
                >
                  {filter.title}
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="flex flex-col gap-5 px-3 py-2">
                    <div>{filter.content}</div>
                    <div className="flex w-full items-center gap-2">
                      <Button
                        onClick={() => setIsOpen(false)}
                        variant="secondary"
                        className="flex-1"
                      >
                        cancel
                      </Button>
                      <Button
                        onClick={() => handleApplyFilter(filter)}
                        className="w-3/4"
                      >
                        apply filter
                      </Button>
                    </div>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex gap-2">
        <Muted>Picket filters</Muted>
        {pickedFilters.map((filterItem, index) => {
          const originalFilter = filters.find(
            (item) => item.title == filterItem.title,
          );

          return (
            originalFilter && (
              <div key={index}>
                <DropdownMenu
                  open={isFilterOpen[index]}
                  onOpenChange={(isOpen) => handleOpenChange(isOpen, index)}
                >
                  <DropdownMenuTrigger asChild>
                    <Button>{originalFilter.descriptionContent}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="flex flex-col gap-5 px-3 py-2">
                    <div>{originalFilter.content}</div>
                    <div className="flex w-full items-center gap-2">
                      <Button
                        size="icon"
                        onClick={() => {
                          resetFilters;
                          handleOpenChange(false, index);
                          removeFilter(originalFilter);
                        }}
                      >
                        <FaTrash className="size-4 flex-shrink-0" />
                      </Button>
                      <Button
                        onClick={() => handleOpenChange(false, index)}
                        variant="secondary"
                        className="flex-1"
                      >
                        cancel
                      </Button>
                      <Button
                        onClick={() => {
                          handleApplyFilter(originalFilter);
                          handleOpenChange(false, index);
                        }}
                        className="flex-1"
                      >
                        apply filter
                      </Button>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default Page;
