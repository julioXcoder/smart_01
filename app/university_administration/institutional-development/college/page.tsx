import HeadingOne from "@/components/typography/headingOne";
import Muted from "@/components/typography/muted";
import { IoMdAdd } from "react-icons/io";
import { Button } from "@/components/ui/button";
import DataTable from "./dataTable";
import { getColleges } from "./actions";
import { getCampuses } from "../campus/actions";
import Add from "./add";
import { columns } from "./columns";

const Page = async () => {
  const colleges = await getColleges();
  const campuses = await getCampuses();

  let collegesData = colleges.map((obj) => ({
    ...obj,
    campusName: obj.campus.name,
  }));

  let campusSelectList = campuses.map((obj) => ({
    label: obj.name,
    value: obj.id,
  }));

  return (
    <div>
      {" "}
      <div className="flex w-full items-center justify-between">
        <div>
          <HeadingOne>College Lists</HeadingOne>
          <Muted>{`There are a total of ${colleges.length} colleges.`}</Muted>
        </div>
        <Add campusSelectList={campusSelectList} />
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={collegesData} />
      </div>
    </div>
  );
};

export default Page;
