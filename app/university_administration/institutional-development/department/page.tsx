import HeadingOne from "@/components/typography/headingOne";
import Muted from "@/components/typography/muted";
import { IoMdAdd } from "react-icons/io";
import { Button } from "@/components/ui/button";
import DataTable from "./dataTable";
import { columns } from "./columns";
import { getDepartments } from "./actions";
import { getColleges } from "../college/actions";
import Add from "./add";

const Page = async () => {
  const departments = await getDepartments();
  const colleges = await getColleges();

  let departmentData = departments.map((obj) => ({
    ...obj,
    collegeName: obj.college.name,
    campusName: obj.college.campus.name,
  }));

  let collegeSelectList = colleges.map((obj) => ({
    label: obj.name,
    value: obj.id,
  }));

  return (
    <div>
      {" "}
      <div className="flex w-full items-center justify-between">
        <div>
          <HeadingOne>Department Lists</HeadingOne>
          <Muted>
            {`There are a total of ${departments.length} departments.`}
          </Muted>
        </div>
        <Add collegeSelectList={collegeSelectList} />
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={departmentData} />
      </div>
    </div>
  );
};

export default Page;
