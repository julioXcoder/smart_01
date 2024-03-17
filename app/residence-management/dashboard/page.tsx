import TinyBarChart from "@/components/residence-management/charts/tinyBarChart";
import Rooms from "@/components/residence-management/cards/rooms";
import Booking from "@/components/residence-management/cards/booking";
import StudentNumber from "@/components/residence-management/cards/studentNumber";
import CalendarCard from "@/components/residence-management/cards/calendarCard";
import DataTable from "@/components/dataTable";
import { columns, users } from "./columns";

const Page = () => {
  return (
    <div>
      Dashboard
      {/* <TinyBarChart /> */}
      <div className="flex justify-between ">
        <div className="flex space-x-4">
          <Rooms />
          <Booking />
          <StudentNumber />
        </div>
        {/* <CalendarCard /> */}
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={users} />
      </div>
    </div>
  );
};

export default Page;
