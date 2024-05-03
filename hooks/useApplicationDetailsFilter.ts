import { useState } from "react";
import useArrayToggle from "@/hooks/useArrayToggle";
import {
  ApplicationStatus,
  ProgrammeLevel,
  ApplicationDetails,
} from "@prisma/client";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

export enum DateFilterOption {
  GreaterThan = "greater than",
  LessThan = "less than",
  EqualTo = "equal to",
  Between = "between",
}

export interface Filter {
  title: string;
  content: JSX.Element;
  descriptionContent: JSX.Element;
}

export interface IDateFilterState {
  dateFilterOption: DateFilterOption;
  dateInput: Date | undefined;
  dateInputRangeStart: Date | undefined;
  dateInputRangeEnd: Date | undefined;
}

export interface IFilter {
  title: string;
  content: JSX.Element;
  descriptionContent: JSX.Element;
  reset: () => void;
}

const useApplicationDetailsFilter = (applicants: ApplicationDetails[]) => {
  const [
    selectedApplicationStatuses,
    toggleApplicationStatus,
    resetApplicationStatusFilter,
  ] = useArrayToggle(Object.values(ApplicationStatus));
  const [
    selectedApplicationTypes,
    toggleApplicationType,
    resetApplicationTypeFilter,
  ] = useArrayToggle(Object.values(ProgrammeLevel));
  const [filteredData, setFilteredData] =
    useState<ApplicationDetails[]>(applicants);
  const [date, setDate] = useState<Date | undefined>();
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(), // Now
    to: addDays(new Date(), 3), // 3 days from now
  });
  const [isOpen, setIsOpen] = useState(false);
  const [pickedFilters, setPickedFilters] = useState<Filter[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(
    new Array(pickedFilters.length).fill(false),
  );

  const [dateFilter, setDateFilter] = useState<IDateFilterState>({
    dateFilterOption: DateFilterOption.GreaterThan,
    dateInput: undefined,
    dateInputRangeStart: undefined,
    dateInputRangeEnd: undefined,
  });

  const applicationStatuses = Object.values(ApplicationStatus);
  const applicationProgrammeTypes = Object.values(ProgrammeLevel);

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

  const applyFilters = (): ApplicationDetails[] => {
    let result = applicants;

    // Apply status filter
    result = result.filter((item) =>
      selectedApplicationStatuses.includes(item.applicationStatus),
    );

    // Apply date filter
    result = applyDateFilter(result);

    // Apply application type filter
    result = result.filter((item) =>
      selectedApplicationTypes.includes(item.applicationType),
    );

    return result;
  };

  const resetFilters = () => {
    resetApplicationStatusFilter();
    resetApplicationTypeFilter();
    setDateFilter({
      dateFilterOption: DateFilterOption.GreaterThan,
      dateInput: undefined,
      dateInputRangeStart: undefined,
      dateInputRangeEnd: undefined,
    });
  };

  // Handle open state change
  const handleOpenChange = (isOpen: boolean, index: number) => {
    setIsFilterOpen((prevOpenState) => {
      const newOpenState = [...prevOpenState]; // Create a copy of the previous state
      newOpenState[index] = isOpen; // Update the open state of the clicked dropdown menu
      return newOpenState; // Return the new state
    });
  };

  return {
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
  };
};

export default useApplicationDetailsFilter;
