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

type Checked = DropdownMenuCheckboxItemProps["checked"];

// Define the Room type
type Room = {
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

  const shuffledRooms = studentResidences.flatMap((residence) =>
    residence.rooms.map((room) => ({ location: residence.location, room })),
  );

  return (
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
      OffCampus
      <div className="m-20 grid grid-cols-3">
        {shuffledRooms.map((item, index) => (
          <div key={index} className="m-4 cursor-pointer">
            <Carousel className="group relative w-full max-w-xs">
              {/* FIXME: Go to card component */}
              <CarouselContent onClick={() => alert("clicked!!!")}>
                {item.room.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card className="overflow-hidden ">
                        <CardContent className="relative aspect-square">
                          <Image
                            src={image}
                            className="object-cover"
                            alt=""
                            fill
                            quality={100}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <span
                className={`absolute right-4 top-4 inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium ${
                  item.room.availability
                    ? "bg-teal-100 text-teal-800 dark:bg-teal-500/10 dark:text-teal-500"
                    : "bg-red-100 text-red-800 dark:bg-red-500/10 dark:text-red-500"
                }`}
              >
                {item.room.availability ? (
                  <BsPatchCheckFill className="size-3 flex-shrink-0 animate-pulse" />
                ) : (
                  <IoIosCloseCircle className="size-3 flex-shrink-0" />
                )}

                {item.room.availability ? "Available" : "Booked"}
              </span>

              <CarouselPrevious className="absolute left-4 top-1/2 hidden group-hover:flex" />
              <CarouselNext className="absolute right-4 top-1/2 hidden group-hover:flex" />
            </Carousel>
            <div className="mt-2 flex w-full items-start justify-between">
              <div className="max-w-[40%]">
                <Paragraph>{item.location} Lorem ipsum</Paragraph>
                {item.room.type}
              </div>
              <Muted>{item.room.price}000 TZS/month</Muted>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffCampus;
