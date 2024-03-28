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
import { ColumnDef } from "@tanstack/react-table";
import moment from "moment";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { Department } from "@prisma/client";

interface DepartmentData extends Department {
  collegeName: string;
  campusName: string;
}

export const columns: ColumnDef<DepartmentData>[] = [
  {
    accessorKey: "name",
    header: "Department Name",
  },
  {
    accessorKey: "collegeName",
    header: "College Name",
  },
  {
    accessorKey: "campusName",
    header: "Campus Name",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

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
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
