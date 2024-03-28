import HeadingOne from "@/components/typography/headingOne";
import Muted from "@/components/typography/muted";
import Add from "./add";
import { getCampuses } from "./actions";
import DataTable from "./dataTable";
import { columns } from "./columns";

const Page = async () => {
  const campuses = await getCampuses();

  return (
    <div>
      <div className="flex w-full items-center justify-between">
        <div>
          <HeadingOne>Campus Lists</HeadingOne>
          <Muted>{`There are a total of ${campuses.length} campuses.`}</Muted>
        </div>
        <Add />
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={campuses} />
      </div>
    </div>
  );
};

export default Page;
