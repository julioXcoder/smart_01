import { useState } from "react";
import useArrayToggle from "@/hooks/useArrayToggle";
import {
  ApplicationStatus,
  ProgrammeLevel,
  ApplicationDetails,
} from "@prisma/client";
import { addDays, format } from "date-fns";

export enum DateFilterOption {
  GreaterThan = "greater than",
  LessThan = "less than",
  EqualTo = "equal to",
  Between = "between",
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

const useTableFilter = (applicants: ApplicationDetails[]) => {
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

  const [dateFilter, setDateFilter] = useState<IDateFilterState>({
    dateFilterOption: DateFilterOption.GreaterThan,
    dateInput: undefined,
    dateInputRangeStart: undefined,
    dateInputRangeEnd: undefined,
  });

  const [initialStatuses, setInitialStatuses] = useState<ApplicationStatus[]>(
    [],
  );
  const [initialTypes, setInitialTypes] = useState<ProgrammeLevel[]>([]);

  const handleSetInitialValues = () => {
    setInitialStatuses(selectedApplicationStatuses);
    setInitialTypes(selectedApplicationTypes);
  };

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

  return {
    selectedApplicationStatuses,
    toggleApplicationStatus,
    selectedApplicationTypes,
    toggleApplicationType,
    dateFilter,
    setDateFilter,
    applyFilters,
    resetFilters,
    handleSetInitialValues,
    initialStatuses,
    initialTypes,
  };
};

export default useTableFilter;
