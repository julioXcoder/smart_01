import React from "react";
import { BsPatchCheckFill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import Muted from "../typography/muted";
import Paragraph from "../typography/paragraph";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import Image from "next/image";
import { Room } from "./accommodation/offCampus";

interface Props {
  shuffledRooms: {
    location: string;
    room: Room;
  }[];

  onRoomSelect: (room: { location: string; room: Room }) => void;
}

const RoomList = ({ shuffledRooms, onRoomSelect }: Props) => {
  return (
    <div className="md:mx-auto">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
        {shuffledRooms.map((item, index) => (
          <div key={index} className="m-4 cursor-pointer">
            <Carousel className="group relative w-full max-w-xs">
              {/* FIXME: Go to card component */}
              <CarouselContent onClick={() => onRoomSelect(item)}>
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
            <div className="mt-2">
              <Paragraph>{item.location}</Paragraph>
              {item.room.type}
              <Muted>{item.room.price}000 TZS/month</Muted>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
