"use client";

import HeadingOne from "@/components/typography/headingOne";
import Muted from "@/components/typography/muted";
import { IoMdAdd } from "react-icons/io";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/data-table/table";
// import Add from "./add";
import { columns, applicants } from "./columns";
import { DataTablePagination } from "@/components/data-table/pagination";
import { useState } from "react";
import { ApplicationDetails } from "@prisma/client";

enum DateFilterOption {
  GreaterThan = "greaterThan",
  LessThan = "lessThan",
  EqualTo = "equalTo",
  Between = "between",
}

interface IDateFilterState {
  dateFilterOption: DateFilterOption;
  dateInput: string;
  dateInputRangeStart: string;
  dateInputRangeEnd: string;
}

const Page = () => {
  const [filteredData, setFilteredData] =
    useState<ApplicationDetails[]>(applicants);
  const [selectedStatuses, setSelectedStatuses] = useState([
    "DRAFT",
    "ACCEPTED",
    "REJECTED",
    "UNDER_REVIEW",
  ]);
  const [selectedApplicationTypes, setSelectedApplicationTypes] = useState([
    "BACHELOR",
    "CERTIFICATE",
    "MASTERS",
    "PHD",
    "DIPLOMA",
  ]);

  const [dateFilter, setDateFilter] = useState<IDateFilterState>({
    dateFilterOption: DateFilterOption.GreaterThan,
    dateInput: "",
    dateInputRangeStart: "",
    dateInputRangeEnd: "",
  });

  const toggleStatus = (status: string) => {
    setSelectedStatuses((currentStatuses) =>
      currentStatuses.includes(status)
        ? currentStatuses.filter((s) => s !== status)
        : [...currentStatuses, status],
    );
  };

  const toggleApplicationType = (type: string) => {
    setSelectedApplicationTypes((currentTypes) =>
      currentTypes.includes(type)
        ? currentTypes.filter((t) => t !== type)
        : [...currentTypes, type],
    );
  };

  const applyDateFilter = (
    data: ApplicationDetails[],
  ): ApplicationDetails[] => {
    // Check if the date inputs are not empty
    if (
      dateFilter.dateInput ||
      (dateFilter.dateInputRangeStart && dateFilter.dateInputRangeEnd)
    ) {
      switch (dateFilter.dateFilterOption) {
        case "greaterThan":
          return data.filter(
            (item) => new Date(item.createdAt) > new Date(dateFilter.dateInput),
          );
        case "lessThan":
          return data.filter(
            (item) => new Date(item.createdAt) < new Date(dateFilter.dateInput),
          );
        case "equalTo":
          return data.filter(
            (item) =>
              new Date(item.createdAt).toDateString() ===
              new Date(dateFilter.dateInput).toDateString(),
          );
        case "between":
          return data.filter(
            (item) =>
              new Date(item.createdAt) >=
                new Date(dateFilter.dateInputRangeStart) &&
              new Date(item.createdAt) <=
                new Date(dateFilter.dateInputRangeEnd),
          );
        default:
          return data;
      }
    } else {
      // If the date inputs are empty, return the original data without filtering
      return data;
    }
  };

  const applyFilters = (): ApplicationDetails[] => {
    let result = applicants;

    // Apply status filter
    result = result.filter((item) =>
      selectedStatuses.includes(item.applicationStatus),
    );

    // Apply date filter
    result = applyDateFilter(result);

    // Apply application type filter
    result = result.filter((item) =>
      selectedApplicationTypes.includes(item.applicationType),
    );

    return result;
  };

  return (
    <div>
      {/* <div className="flex w-full items-center justify-between">
        <div>
          <HeadingOne>Applications Lists</HeadingOne>
          <Muted>{`There are a total of ${applicants.length} applications.`}</Muted>
        </div>
        <Add campusSelectList={campusSelectList} />
        <IoMdAdd className="size-6 flex-shrink-0" />
      </div> */}
      <div>
        {["DRAFT", "ACCEPTED", "REJECTED", "UNDER_REVIEW"].map((status) => (
          <label key={status}>
            <input
              type="checkbox"
              checked={selectedStatuses.includes(status)}
              onChange={() => toggleStatus(status)}
            />
            {status}
          </label>
        ))}
      </div>

      <div>
        {/* Radio buttons for date filter options */}
        {(
          [
            "greaterThan",
            "lessThan",
            "equalTo",
            "between",
          ] as DateFilterOption[]
        ).map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="dateFilter"
              value={option}
              checked={dateFilter.dateFilterOption === option}
              onChange={() =>
                setDateFilter({ ...dateFilter, dateFilterOption: option })
              }
            />
            {option}
          </label>
        ))}

        {/* Input fields for date values */}
        {dateFilter.dateFilterOption !== "between" ? (
          <input
            type="date"
            value={dateFilter.dateInput}
            onChange={(e) =>
              setDateFilter({ ...dateFilter, dateInput: e.target.value })
            }
          />
        ) : (
          <>
            <input
              type="date"
              value={dateFilter.dateInputRangeStart}
              onChange={(e) =>
                setDateFilter({
                  ...dateFilter,
                  dateInputRangeStart: e.target.value,
                })
              }
            />
            <input
              type="date"
              value={dateFilter.dateInputRangeEnd}
              onChange={(e) =>
                setDateFilter({
                  ...dateFilter,
                  dateInputRangeEnd: e.target.value,
                })
              }
            />
          </>
        )}
      </div>

      <div>
        {["BACHELOR", "CERTIFICATE", "MASTERS", "PHD", "DIPLOMA"].map(
          (type) => (
            <label key={type}>
              <input
                type="checkbox"
                checked={selectedApplicationTypes.includes(type)}
                onChange={() => toggleApplicationType(type)}
              />
              {type}
            </label>
          ),
        )}
      </div>

      {/* TODO: Display */}
      <div>
        {selectedStatuses.length < 4 &&
          `Status: ${selectedStatuses.join(", ")}`}
        {dateFilter.dateFilterOption === "greaterThan" &&
          ` | Created at greater than ${dateFilter.dateInput}`}
        {/* ... other conditions */}
      </div>

      {/* TODO: Display */}
      <div>
        {selectedStatuses.length < 4 &&
          `Status: ${selectedStatuses.join(", ")}`}
        {selectedApplicationTypes.length < 5 &&
          ` | Type: ${selectedApplicationTypes.join(", ")}`}
        {/* ... other conditions for date filter */}
      </div>

      <button onClick={() => setFilteredData(applyFilters())}>
        Apply Filters
      </button>

      <div className="container mx-auto">
        <DataTable columns={columns} data={filteredData} />
      </div>
    </div>
  );
};

export default Page;
