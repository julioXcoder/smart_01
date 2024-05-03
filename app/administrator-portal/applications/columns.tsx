"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-table/columnHeader";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import moment from "moment";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { ApplicationDetails } from "@prisma/client";

export const columns: ColumnDef<ApplicationDetails>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "applicantUsername",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="name" />
    ),
  },
  {
    accessorKey: "applicationStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="application status" />
    ),
  },
  // {
  //   accessorKey: "createdAt",
  //   header: "created at",
  // },
  // {
  //   accessorKey: "submittedAt",
  //   header: "submitted at",
  // },
  {
    accessorKey: "applicationType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="application type" />
    ),
  },
  {
    accessorKey: "educationOrigin",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="education origin" />
    ),
  },
  {
    accessorKey: "highestEducationLevel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="highest education level" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      user.applicationStatus;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MdOutlineMoreHoriz className="size-4 shrink-0" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View applicant details</DropdownMenuItem>
            <DropdownMenuItem>{user.applicationStatus}</DropdownMenuItem>
            {/* <DropdownMenuItem>View payment details</DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const today = new Date(Date.now());

export const applicants: ApplicationDetails[] = [
  {
    applicantUsername: "user 1",
    applicationStatus: "DRAFT",
    createdAt: today,
    submittedAt: today,
    applicationType: "BACHELOR",
    educationOrigin: "NECTA",
    highestEducationLevel: "DIPLOMA",
    formIVIndex: "asdasdass",
    controlNumber: "",
    paymentStatus: "PENDING",
  },
  {
    applicantUsername: "sadasdadasas",
    applicationStatus: "ACCEPTED",
    createdAt: today,
    submittedAt: today,
    applicationType: "CERTIFICATE",
    educationOrigin: "NECTA",
    highestEducationLevel: "DIPLOMA",
    formIVIndex: "asdasdass",
    controlNumber: "",
    paymentStatus: "FAILED",
  },
  {
    applicantUsername: "asdadawqfvxwqwq",
    applicationStatus: "REJECTED",
    createdAt: today,
    submittedAt: today,
    applicationType: "DIPLOMA",
    educationOrigin: "NECTA",
    highestEducationLevel: "DIPLOMA",
    formIVIndex: "asdasdass",
    controlNumber: "",
    paymentStatus: "PENDING",
  },
  {
    applicantUsername: "dfewewfwwes",
    applicationStatus: "DRAFT",
    createdAt: today,
    submittedAt: today,
    applicationType: "MASTERS",
    educationOrigin: "NECTA",
    highestEducationLevel: "DIPLOMA",
    formIVIndex: "asdasdass",
    controlNumber: "",
    paymentStatus: "PENDING",
  },
  {
    applicantUsername: "eqfqefdsfeq",
    applicationStatus: "DRAFT",
    createdAt: today,
    submittedAt: today,
    applicationType: "PHD",
    educationOrigin: "NECTA",
    highestEducationLevel: "MASTERS",
    formIVIndex: "asdasdass",
    controlNumber: "",
    paymentStatus: "PENDING",
  },
  {
    applicantUsername: "awdqdqwdqwq",
    applicationStatus: "UNDER_REVIEW",
    createdAt: today,
    submittedAt: today,
    applicationType: "BACHELOR",
    educationOrigin: "NECTA",
    highestEducationLevel: "DIPLOMA",
    formIVIndex: "asdasdass",
    controlNumber: "",
    paymentStatus: "PENDING",
  },
  {
    applicantUsername: "sadawdasdas",
    applicationStatus: "DRAFT",
    createdAt: today,
    submittedAt: today,
    applicationType: "BACHELOR",
    educationOrigin: "NECTA",
    highestEducationLevel: "DIPLOMA",
    formIVIndex: "asdasdass",
    controlNumber: "",
    paymentStatus: "PENDING",
  },
  {
    applicantUsername: "adwqdqwdasa",
    applicationStatus: "REJECTED",
    createdAt: today,
    submittedAt: today,
    applicationType: "MASTERS",
    educationOrigin: "NECTA",
    highestEducationLevel: "DIPLOMA",
    formIVIndex: "asdasdass",
    controlNumber: "",
    paymentStatus: "PENDING",
  },
  {
    applicantUsername: "wdqdqwdqw",
    applicationStatus: "UNDER_REVIEW",
    createdAt: today,
    submittedAt: today,
    applicationType: "DIPLOMA",
    educationOrigin: "NECTA",
    highestEducationLevel: "NTA_LEVEL_IV",
    formIVIndex: "asdasdass",
    controlNumber: "",
    paymentStatus: "PENDING",
  },
  {
    applicantUsername: "wdqwdqwdqwdqwdqwwq",
    applicationStatus: "REJECTED",
    createdAt: today,
    submittedAt: today,
    applicationType: "DIPLOMA",
    educationOrigin: "NECTA",
    highestEducationLevel: "MASTERS",
    formIVIndex: "asdasdass",
    controlNumber: "",
    paymentStatus: "PENDING",
  },
  {
    applicantUsername: "wqdqwdqwdqw",
    applicationStatus: "REJECTED",
    createdAt: today,
    submittedAt: today,
    applicationType: "DIPLOMA",
    educationOrigin: "NECTA",
    highestEducationLevel: "NTA_LEVEL_IV",
    formIVIndex: "asdasdass",
    controlNumber: "",
    paymentStatus: "PENDING",
  },
];
