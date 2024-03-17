"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FaArrowDown, FaArrowUp } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

export type User = {
  id: string;
  name: string;
  // firstName: string;
  // middleName: string;
  // lastName: string;
  disability: string;
  gender: string;
  // imageUrl: string;
  booking: "PENDING" | "ACTIVE";
  payment: "DUE" | "PAID";
  // phone: string;
  // email: string;
  roomName: string;
  // arrive: Date;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <FaArrowDown className="ml-2 size-3" />
        </Button>
      );
    },
  },
  {
    accessorKey: "disability",
    header: "Disability",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  // {
  //   accessorKey: "imageUrl",
  //   header: "Image URL",
  // },
  {
    accessorKey: "booking",
    header: "Booking Status",
  },
  {
    accessorKey: "payment",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center"
          role="button"
        >
          Payment
          <FaArrowDown className="ml-2 size-3" />
        </div>
      );
    },
  },
  // {
  //   accessorKey: "phone",
  //   header: "Phone",
  // },
  // {
  //   accessorKey: "email",
  //   header: "Email",
  // },
  {
    accessorKey: "roomName",
    header: "Room Name",
  },
  // {
  //   accessorKey: "arrive",
  //   header: "Arrival Date",
  // },
];

export const users: User[] = [
  {
    id: "KrIPrufetP",
    name: "Kkmba xhlYk",
    disability: "Visual",
    gender: "Female",
    // imageUrl: "https://example.com/KrIPrufetP.jpg",
    booking: "PENDING",
    payment: "DUE",
    // phone: "1234567890",
    // email: "Kkmba@example.com",
    roomName: "Room1",
    // arrive: new Date("2002-01-07"),
  },
  {
    id: "qrozdhyzvl",
    name: "vmaep mjvkh",
    disability: "Physical",
    gender: "Male",
    // imageUrl: "https://example.com/qrozdhyzvl.jpg",
    booking: "ACTIVE",
    payment: "DUE",
    // phone: "2828699626",
    // email: "vmaep@example.com",
    roomName: "Room2",
    // arrive: new Date("2024-02-16"),
  },
  {
    id: "adsdasdas",
    name: "sdadas sadasdas",
    disability: "",
    gender: "Male",
    // imageUrl: "https://example.com/qrozdhyzvl.jpg",
    booking: "ACTIVE",
    payment: "DUE",
    // phone: "12312312312",
    // email: "vmaep@example.com",
    roomName: "Room2",
    // arrive: new Date("2024-02-16"),
  },
  {
    id: "ChWrwSOICI",
    name: "iLwnX iLwnX",
    disability: "Physical",
    gender: "Female",
    // imageUrl: "https://example.com/ChWrwSOICI.jpg",
    booking: "ACTIVE",
    payment: "PAID",
    // phone: "3117045045",
    // email: "sXgdO@example.com",
    roomName: "Room6",
    // arrive: new Date("2024-02-16"),
  },
  {
    id: "ChWrwSOICI",
    name: "iLwnX iLwnX",
    disability: "Physical",
    gender: "Female",
    // imageUrl: "https://example.com/ChWrwSOICI.jpg",
    booking: "ACTIVE",
    payment: "PAID",
    // phone: "3117045045",
    // email: "sXgdO@example.com",
    roomName: "Room6",
    // arrive: new Date("2024-02-16"),
  },
  {
    id: "ChWrwSOICI",
    name: "iLwnX iLwnX",
    disability: "Physical",
    gender: "Female",
    // imageUrl: "https://example.com/ChWrwSOICI.jpg",
    booking: "ACTIVE",
    payment: "PAID",
    // phone: "3117045045",
    // email: "sXgdO@example.com",
    roomName: "Room6",
    // arrive: new Date("2024-02-16"),
  },
  {
    id: "ChWrwSOICI",
    name: "iLwnX iLwnX",
    disability: "Physical",
    gender: "Female",
    // imageUrl: "https://example.com/ChWrwSOICI.jpg",
    booking: "ACTIVE",
    payment: "PAID",
    // phone: "3117045045",
    // email: "sXgdO@example.com",
    roomName: "Room6",
    // arrive: new Date("2024-02-16"),
  },
  {
    id: "ChWrwSOICI",
    name: "iLwnX iLwnX",
    disability: "Physical",
    gender: "Female",
    // imageUrl: "https://example.com/ChWrwSOICI.jpg",
    booking: "ACTIVE",
    payment: "PAID",
    // phone: "3117045045",
    // email: "sXgdO@example.com",
    roomName: "Room6",
    // arrive: new Date("2024-02-16"),
  },
  {
    id: "ChWrwSOICI",
    name: "iLwnX iLwnX",
    disability: "Physical",
    gender: "Female",
    // imageUrl: "https://example.com/ChWrwSOICI.jpg",
    booking: "ACTIVE",
    payment: "PAID",
    // phone: "3117045045",
    // email: "sXgdO@example.com",
    roomName: "Room6",
    // arrive: new Date("2024-02-16"),
  },
  {
    id: "ChWrwSOICI",
    name: "iLwnX iLwnX",
    disability: "Physical",
    gender: "Female",
    // imageUrl: "https://example.com/ChWrwSOICI.jpg",
    booking: "ACTIVE",
    payment: "PAID",
    // phone: "3117045045",
    // email: "sXgdO@example.com",
    roomName: "Room6",
    // arrive: new Date("2024-02-16"),
  },
  {
    id: "ChWrwSOICI",
    name: "iLwnX iLwnX",
    disability: "Physical",
    gender: "Female",
    // imageUrl: "https://example.com/ChWrwSOICI.jpg",
    booking: "ACTIVE",
    payment: "PAID",
    // phone: "3117045045",
    // email: "sXgdO@example.com",
    roomName: "Room6",
    // arrive: new Date("2024-02-16"),
  },
  {
    id: "ChWrwSOICI",
    name: "iLwnX iLwnX",
    disability: "Physical",
    gender: "Female",
    // imageUrl: "https://example.com/ChWrwSOICI.jpg",
    booking: "ACTIVE",
    payment: "PAID",
    // phone: "3117045045",
    // email: "sXgdO@example.com",
    roomName: "Room6",
    // arrive: new Date("2024-02-16"),
  },
  {
    id: "ChWrwSOICI",
    name: "iLwnX iLwnX",
    disability: "Physical",
    gender: "Female",
    // imageUrl: "https://example.com/ChWrwSOICI.jpg",
    booking: "ACTIVE",
    payment: "PAID",
    // phone: "3117045045",
    // email: "sXgdO@example.com",
    roomName: "Room6",
    // arrive: new Date("2024-02-16"),
  },
  {
    id: "ChWrwSOICI",
    name: "iLwnX iLwnX",
    disability: "Physical",
    gender: "Female",
    // imageUrl: "https://example.com/ChWrwSOICI.jpg",
    booking: "ACTIVE",
    payment: "PAID",
    // phone: "3117045045",
    // email: "sXgdO@example.com",
    roomName: "Room6",
    // arrive: new Date("2024-02-16"),
  },
  {
    id: "ChWrwSOICI",
    name: "iLwnX iLwnX",
    disability: "Physical",
    gender: "Female",
    // imageUrl: "https://example.com/ChWrwSOICI.jpg",
    booking: "ACTIVE",
    payment: "PAID",
    // phone: "3117045045",
    // email: "sXgdO@example.com",
    roomName: "Room6",
    // arrive: new Date("2024-02-16"),
  },
  {
    id: "ChWrwSOICI",
    name: "iLwnX iLwnX",
    disability: "Physical",
    gender: "Female",
    // imageUrl: "https://example.com/ChWrwSOICI.jpg",
    booking: "ACTIVE",
    payment: "PAID",
    // phone: "3117045045",
    // email: "sXgdO@example.com",
    roomName: "Room6",
    // arrive: new Date("2024-02-16"),
  },
  {
    id: "ChWrwSOICI",
    name: "iLwnX iLwnX",
    disability: "Physical",
    gender: "Female",
    // imageUrl: "https://example.com/ChWrwSOICI.jpg",
    booking: "ACTIVE",
    payment: "PAID",
    // phone: "3117045045",
    // email: "sXgdO@example.com",
    roomName: "Room6",
    // arrive: new Date("2024-02-16"),
  },
  {
    id: "ChWrwSOICI",
    name: "iLwnX iLwnX",
    disability: "Physical",
    gender: "Female",
    // imageUrl: "https://example.com/ChWrwSOICI.jpg",
    booking: "ACTIVE",
    payment: "PAID",
    // phone: "3117045045",
    // email: "sXgdO@example.com",
    roomName: "Room6",
    // arrive: new Date("2024-02-16"),
  },
  {
    id: "ChWrwSOICI",
    name: "iLwnX iLwnX",
    disability: "Physical",
    gender: "Female",
    // imageUrl: "https://example.com/ChWrwSOICI.jpg",
    booking: "ACTIVE",
    payment: "PAID",
    // phone: "3117045045",
    // email: "sXgdO@example.com",
    roomName: "Room6",
    // arrive: new Date("2024-02-16"),
  },
  {
    id: "ChWrwSOICI",
    name: "iLwnX iLwnX",
    disability: "Physical",
    gender: "Female",
    // imageUrl: "https://example.com/ChWrwSOICI.jpg",
    booking: "ACTIVE",
    payment: "PAID",
    // phone: "3117045045",
    // email: "sXgdO@example.com",
    roomName: "Room6",
    // arrive: new Date("2024-02-16"),
  },
  {
    id: "ChWrwSOICI",
    name: "iLwnX iLwnX",
    disability: "Physical",
    gender: "Female",
    // imageUrl: "https://example.com/ChWrwSOICI.jpg",
    booking: "ACTIVE",
    payment: "PAID",
    // phone: "3117045045",
    // email: "sXgdO@example.com",
    roomName: "Room6",
    // arrive: new Date("2024-02-16"),
  },
  {
    id: "ChWrwSOICI",
    name: "iLwnX iLwnX",
    disability: "Physical",
    gender: "Female",
    // imageUrl: "https://example.com/ChWrwSOICI.jpg",
    booking: "ACTIVE",
    payment: "PAID",
    // phone: "3117045045",
    // email: "sXgdO@example.com",
    roomName: "Room6",
    // arrive: new Date("2024-02-16"),
  },
  {
    id: "ChWrwSOICI",
    name: "iLwnX iLwnX",
    disability: "Physical",
    gender: "Female",
    // imageUrl: "https://example.com/ChWrwSOICI.jpg",
    booking: "ACTIVE",
    payment: "PAID",
    // phone: "3117045045",
    // email: "sXgdO@example.com",
    roomName: "Room6",
    // arrive: new Date("2024-02-16"),
  },
];
