import TinyBarChart from "@/components/residence-management/charts/tinyBarChart";
import Rooms from "@/components/residence-management/cards/rooms";
import CalendarCard from "@/components/residence-management/cards/calendarCard";
import DataTable from "@/components/dataTable";
import { columns, users } from "./columns";

const Page = () => {
  return (
    <div>
      Dashboard
      {/* <TinyBarChart /> */}
      <div className="flex justify-between ">
        <Rooms />
        {/* <CalendarCard /> */}
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={users} />
      </div>
    </div>
  );
};

export default Page;
