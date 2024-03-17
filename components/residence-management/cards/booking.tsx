import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LuCalendarPlus } from "react-icons/lu";
import TinyBarChart from "../charts/tinyBarChart";

const Booking = () => {
  return (
    <Card className="max-h-48 w-[350px]">
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <div>
            <h1>Total booking</h1>
            <h1 className="text-lg font-semibold">500</h1>
          </div>

          <LuCalendarPlus className="size-5 flex-shrink-0" />
        </div>
      </CardHeader>
      <CardContent className="flex w-full items-end justify-between">
        <div className="">
          <h1>This year</h1>
          <h1 className="text-lg font-semibold">53</h1>
        </div>
        <div className="">
          <h1>This month</h1>
          <h1 className="text-lg font-semibold">23</h1>
        </div>
        <div className="flex h-14 w-full max-w-32 justify-end">
          <TinyBarChart />
        </div>
      </CardContent>
    </Card>
  );
};

export default Booking;
