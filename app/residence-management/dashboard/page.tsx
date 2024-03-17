import TinyBarChart from "@/components/residence-management/charts/tinyBarChart";
import Rooms from "@/components/residence-management/cards/rooms";
import Booking from "@/components/residence-management/cards/booking";
import StudentNumber from "@/components/residence-management/cards/studentNumber";
import CalendarCard from "@/components/residence-management/cards/calendarCard";
import NewCustomerCard from "./newCustomerCard";
import RecentActivitiesCard from "./recentActivitiesCard";

const Page = () => {
  return (
    <div>
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <Rooms />
        <Booking />
        <StudentNumber />
      </div>
      {/* <div className="mt-6 grid grid-cols-2 gap-4"> */}
      <div className="mt-6 flex flex-col gap-5 md:flex-row">
        <NewCustomerCard />
        <RecentActivitiesCard />
      </div>
    </div>
  );
};

export default Page;
