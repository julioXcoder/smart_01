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
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { Checkbox } from "@/components/ui/checkbox";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserInitials } from "@/utils";

export type Room = {
  name: string;
  type: "DOUBLE" | "SINGLE" | "SELF";
  status: "OCCUPIED" | "VACANT" | "RESERVED" | "MAINTENANCE";
  rent: number;
};

export const columns: ColumnDef<Room>[] = [
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
    accessorKey: "name",
    header: "Room Name",
  },
  {
    accessorKey: "type",
    header: "Room Type",
  },
  // FIXME: Add currency
  {
    accessorKey: "rent",
    header: "Rent",
  },
  {
    accessorKey: "status",
    header: "Status",
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

export const rooms: Room[] = [
  {
    name: "101",
    type: "DOUBLE",
    rent: 200000,
    status: "VACANT",
  },
  {
    name: "102",
    type: "SINGLE",
    rent: 100000,
    status: "VACANT",
  },
  {
    name: "103",
    type: "DOUBLE",
    rent: 250000,
    status: "VACANT",
  },
  {
    name: "104",
    type: "DOUBLE",
    rent: 200000,
    status: "VACANT",
  },
];
