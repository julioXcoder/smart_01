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
import { Campus } from "@prisma/client";

// export type Campus = {
//   name: string;
//   location: string;
//   country: string;
// };

export const columns: ColumnDef<Campus>[] = [
  {
    accessorKey: "name",
    header: "Campus Name",
  },
  {
    accessorKey: "location",
    header: "Campus Location",
  },
  {
    accessorKey: "country",
    header: "Campus Country",
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
            <DropdownMenuItem>Edit Campus</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const date = new Date(); // Use your date here
const formattedDate = moment(date).format("DD MMM YYYY");
