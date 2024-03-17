import HeadingOne from "@/components/typography/headingOne";
import Muted from "@/components/typography/muted";
import { IoMdAdd } from "react-icons/io";
import { Button } from "@/components/ui/button";
import DataTable from "./dataTable";
import { columns, bookings } from "./columns";

const Page = () => {
  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <div>
          <HeadingOne>Booking Lists</HeadingOne>
          <Muted>You have total 2,595 booking&apos;s.</Muted>
        </div>
        <Button variant="default" size="icon">
          <IoMdAdd className="size-6 flex-shrink-0" />
        </Button>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={bookings} />
      </div>
    </div>
  );
};

export default Page;
