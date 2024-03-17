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

export type Booking = {
  student: { studentId: string; name: string; imageUrl: string };
  status: "ACTIVE" | "PENDING" | "RESERVE";
  plan: string;
  roomName: string;
  payment: "DUE" | "PAID";
};

export const columns: ColumnDef<Booking>[] = [
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
    accessorKey: "student",
    header: "Student",
    cell: ({ row }) => {
      const { studentId, imageUrl, name } = row.original.student;
      const initials = getUserInitials(name);

      return (
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0">
            <Avatar>
              <AvatarImage src={imageUrl} alt="student image" />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
              {name}
            </p>
            <p className="truncate text-xs text-gray-500 dark:text-gray-400">
              {studentId}
            </p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "plan",
    header: "Plan",
  },
  {
    accessorKey: "status",
    header: "Booking",
  },
  {
    accessorKey: "roomName",
    header: "Room Name",
  },
  {
    accessorKey: "payment",
    header: "Payment",
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
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(user.student.studentId)
              }
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const bookings: Booking[] = [
  {
    student: {
      studentId: "julioXcoder",
      imageUrl: "https://github.com/shadcn.png",
      name: "Julio Njeza",
    },
    plan: "1Mo",
    payment: "DUE",
    status: "PENDING",
    roomName: "101",
  },
];
