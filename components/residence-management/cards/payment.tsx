import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaBed } from "react-icons/fa6";
import TinyBarChart from "../charts/tinyBarChart";

const Payment = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <div>
            <h1>Total Students</h1>
            <h1 className="text-lg font-semibold">5</h1>
          </div>

          <FaBed className="size-5 flex-shrink-0" />
        </div>
      </CardHeader>
      <CardContent className="flex w-full items-end justify-between">
        <div className="">
          <h1>Paid</h1>
          <h1 className="text-lg font-semibold">2</h1>
        </div>
        <div className="">
          <h1>Due</h1>
          <h1 className="text-lg font-semibold">2</h1>
        </div>
        <div className="flex h-14 w-full max-w-32 justify-end">
          <TinyBarChart />
        </div>
      </CardContent>
    </Card>
  );
};

export default Payment;
