import { BsPatchCheckFill } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import HeadingThree from "../typography/headingThree";
import Muted from "../typography/muted";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import { Room } from "./accommodation/offCampus";
import Image from "next/image";
import { Button } from "../ui/button";

interface Props {
  room: {
    location: string;
    room: Room;
  };
  goBack: () => void;
}

const RoomDetails = ({ room, goBack }: Props) => {
  return (
    <div className="mt-8 grid gap-y-8 lg:grid-cols-3 lg:gap-x-6 lg:gap-y-0">
      <div className="flex w-full items-center justify-center sm:px-2  lg:col-span-1">
        <Carousel className="group relative w-full max-w-xs">
          <CarouselContent>
            {room.room.images.map((image, index) => (
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
          <CarouselPrevious className="absolute left-4 top-1/2 hidden group-hover:flex" />
          <CarouselNext className="absolute right-4 top-1/2 hidden group-hover:flex" />
        </Carousel>
      </div>
      <div className="flex flex-col justify-between lg:col-span-2">
        <div>
          <HeadingThree>{room.location}</HeadingThree>
          <div>
            Room type
            <Muted>{room.room.type}</Muted>
          </div>
          <div>
            Located just <Muted>15 kilometers away from the university</Muted>.
          </div>
          <div>
            Amenities
            <div className="flex items-center gap-x-1">
              {room.room.amenities.map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-x-1.5 rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-500 dark:bg-white/[.05] dark:text-white"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 flex w-full flex-col gap-y-2">
          <Button
            variant="secondary"
            className="w-full max-w-64"
            onClick={goBack}
          >
            Return to Room Listings
          </Button>
          <Button size="lg" className="w-full max-w-64">
            Reserve room
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
