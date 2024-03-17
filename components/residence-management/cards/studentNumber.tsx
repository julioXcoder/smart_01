import Muted from "@/components/typography/muted";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { HiUserGroup } from "react-icons/hi2";
import TinyBarChart from "../charts/tinyBarChart";

const StudentNumber = () => {
  return (
    <Card className="max-h-48 w-[350px]">
      <CardHeader>
        <div className="flex w-full items-center justify-between">
          <div>
            <h1>Total students</h1>
            <Muted>last month 200</Muted>
          </div>

          <HiUserGroup className="size-5 flex-shrink-0" />
        </div>
      </CardHeader>
      <CardContent className="flex w-full items-end justify-between">
        <h1 className="text-5xl font-semibold">500</h1>
        <div className="flex h-14 w-full max-w-32 justify-end">
          <TinyBarChart />
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentNumber;
