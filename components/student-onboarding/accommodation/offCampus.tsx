"use client";

import { useState, ChangeEvent } from "react";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import DropdownSelect from "@/components/dropdownSelect";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GoDotFill } from "react-icons/go";
import { BsPatchCheckFill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdFilterList } from "react-icons/md";
import RoomList from "../roomList";
import { getLevelDisplayText } from "@/utils/programme";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Muted from "@/components/typography/muted";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import Paragraph from "@/components/typography/paragraph";
import RoomDetails from "../roomDetails";

type Checked = DropdownMenuCheckboxItemProps["checked"];

// Define the Room type
export type Room = {
  type: "single" | "self";
  amenities: string[];
  price: number;
  duration: string;
  images: string[];
  availability: boolean;
};

// Define the StudentResidence type
type StudentResidence = {
  location: string;
  name: string;
  contact: string;
  rooms: Room[];
};

const studentResidences: StudentResidence[] = [
  {
    location: "Location 1",
    name: "Residence 1",
    contact: "Contact 1",
    rooms: [
      {
        type: "single",
        amenities: ["WiFi", "AC"],
        price: 100,
        duration: "1 year",
        images: [
          "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cm9vbXxlbnwwfHwwfHx8MA%3D%3D",
          "https://plus.unsplash.com/premium_photo-1674676471380-1258cb31b3ac?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cm9vbXxlbnwwfHwwfHx8MA%3D%3D",
        ],
        availability: true,
      },
      {
        type: "self",
        amenities: ["WiFi", "AC", "TV"],
        price: 150,
        duration: "1 year",
        images: [
          "https://images.unsplash.com/photo-1564078516393-cf04bd966897?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cm9vbXxlbnwwfHwwfHx8MA%3D%3D",
          "https://images.unsplash.com/photo-1589834390005-5d4fb9bf3d32?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cm9vbXxlbnwwfHwwfHx8MA%3D%3D",
        ],
        availability: false,
      },
      // Add more rooms...
    ],
  },
  {
    location: "Location 2",
    name: "Residence 2",
    contact: "Contact 2",
    rooms: [
      {
        type: "single",
        amenities: ["WiFi", "AC"],
        price: 120,
        duration: "1 year",
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHJvb218ZW58MHx8MHx8fDA%3D",
          "https://images.unsplash.com/photo-1481277542470-605612bd2d61?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJvb218ZW58MHx8MHx8fDA%3D",
        ],
        availability: true,
      },
      {
        type: "self",
        amenities: ["WiFi", "AC", "TV"],
        price: 180,
        duration: "1 year",
        images: [
          "https://images.unsplash.com/photo-1486946255434-2466348c2166?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHJvb218ZW58MHx8MHx8fDA%3D",
          "https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHJvb218ZW58MHx8MHx8fDA%3D",
        ],
        availability: true,
      },
      // Add more rooms...
    ],
  },
  // Add more student residences...
  {
    location: "Location 19",
    name: "Residence 19",
    contact: "Contact 19",
    rooms: [
      {
        type: "single",
        amenities: ["WiFi", "AC"],
        price: 95,
        duration: "1 year",
        images: [
          "https://images.unsplash.com/photo-1552242718-c5360894aecd?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHJvb218ZW58MHx8MHx8fDA%3D",
          "https://images.unsplash.com/photo-1502921451607-29fa99d270d4?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHJvb218ZW58MHx8MHx8fDA%3D",
        ],
        availability: true,
      },
      {
        type: "self",
        amenities: ["WiFi", "AC", "TV"],
        price: 140,
        duration: "1 year",
        images: [
          "https://images.unsplash.com/photo-1597218868981-1b68e15f0065?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHJvb218ZW58MHx8MHx8fDA%3D",
          "https://plus.unsplash.com/premium_photo-1684164600683-6ecb6c9c0eb7?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHJvb218ZW58MHx8MHx8fDA%3D",
        ],
        availability: true,
      },
      // Add more rooms...
    ],
  },
];

const OffCampus = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLiked, setIsLiked] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<null | {
    location: string;
    room: Room;
  }>(null);

  const handleRoomClick = (room: { location: string; room: Room }) => {
    setSelectedRoom(room);
  };

  const handleGoBack = () => {
    setSelectedRoom(null);
  };

  const shuffledRooms = studentResidences.flatMap((residence) =>
    residence.rooms.map((room) => ({ location: residence.location, room })),
  );

  return (
    <div>
      {selectedRoom ? (
        <RoomDetails room={selectedRoom} goBack={handleGoBack} />
      ) : (
        <div>
          {/* HEADER */}
          <div className="grid gap-3 border-b border-gray-200 py-4 dark:border-gray-700 md:flex md:items-center md:justify-between">
            <div>
              <div className="relative">
                <input
                  type="text"
                  // value={searchTerm}
                  // onChange={handleSearchChange}
                  className="block w-full rounded-lg border-gray-200 px-3 py-2 ps-11 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
                  placeholder="Search"
                />
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            <div>
              <div className="inline-flex gap-x-2">
                <div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="lg" variant="outline">
                        <MdFilterList className="mr-3 size-4 shrink-0" />
                        Filter
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="text-center">
                          Filter Options
                        </DialogTitle>
                        <DialogDescription className="text-center">
                          Use the filters below to refine your search:
                        </DialogDescription>
                      </DialogHeader>
                      <div>
                        <div className="inline-flex rounded-lg shadow-sm">
                          <button
                            type="button"
                            className="-ms-px inline-flex items-center gap-x-2 border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm first:ms-0 first:rounded-s-lg last:rounded-e-lg hover:bg-gray-50 focus:z-10 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          >
                            Self
                          </button>
                          <button
                            type="button"
                            className="-ms-px inline-flex items-center gap-x-2 border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm first:ms-0 first:rounded-s-lg last:rounded-e-lg hover:bg-gray-50 focus:z-10 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          >
                            Single
                          </button>
                          <button
                            type="button"
                            className="-ms-px inline-flex items-center gap-x-2 border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm first:ms-0 first:rounded-s-lg last:rounded-e-lg hover:bg-gray-50 focus:z-10 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                          >
                            Double
                          </button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>
          {/* HEADER */}
          <RoomList
            onRoomSelect={handleRoomClick}
            shuffledRooms={shuffledRooms}
          />
        </div>
      )}
    </div>
  );
};

export default OffCampus;
