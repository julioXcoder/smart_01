import HeadingOne from "@/components/typography/headingOne";
import Muted from "@/components/typography/muted";
import { IoMdAdd } from "react-icons/io";
import { Button } from "@/components/ui/button";
import DataTable from "./dataTable";
import { columns, colleges } from "./columns";

const Page = () => {
  return (
    <div>
      {" "}
      <div className="flex w-full items-center justify-between">
        <div>
          <HeadingOne>College Lists</HeadingOne>
          <Muted>There are a total of 2 colleges.</Muted>
        </div>
        <Button variant="default" size="icon">
          <IoMdAdd className="size-6 flex-shrink-0" />
        </Button>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={colleges} />
      </div>
    </div>
  );
};

export default Page;
