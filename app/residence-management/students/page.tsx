import { columns, users } from "./columns";
import DataTable from "./dataTable";
import HeadingOne from "@/components/typography/headingOne";
import Muted from "@/components/typography/muted";
import { IoMdAdd } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { IoCloudDownloadOutline } from "react-icons/io5";

const Page = () => {
  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <div>
          <HeadingOne>Student&apos;s Lists</HeadingOne>
          <Muted>You have total 2,595 Student&apos;s</Muted>
        </div>
        <div className="flex items-center gap-x-2">
          <Button variant="secondary">
            <IoCloudDownloadOutline className="mr-2 size-4 flex-shrink-0" />
            Export
          </Button>
          <Button variant="default" size="icon">
            <IoMdAdd className="size-6 flex-shrink-0" />
          </Button>
        </div>
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={users} />
      </div>
    </div>
  );
};

export default Page;
