import HeadingOne from "@/components/typography/headingOne";
import Muted from "@/components/typography/muted";
import { IoMdAdd } from "react-icons/io";
import { Button } from "@/components/ui/button";
import DataTable from "./dataTable";
import { getDepartments } from "../department/actions";
import { getProgrammes } from "./actions";
import { columns } from "./columns";
import Add from "./add";

const Page = async () => {
  const departments = await getDepartments();
  const programmes = await getProgrammes();

  let programmeData = programmes.map((obj) => ({
    ...obj,
    departmentName: obj.department.name,
  }));

  let departmentSelectList = departments.map((obj) => ({
    label: obj.name,
    value: obj.id,
  }));

  return (
    <div>
      {" "}
      <div className="flex w-full items-center justify-between">
        <div>
          <HeadingOne>Programme Lists</HeadingOne>
          <Muted>{`There are a total of ${programmes.length} programmes.`}</Muted>
        </div>
        <Add departmentSelectList={departmentSelectList} />
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={programmeData} />
      </div>
    </div>
  );
};

export default Page;
