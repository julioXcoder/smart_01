import { columns, users } from "./columns";
import DataTable from "../dataTable";

const Page = () => {
  return (
    <div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={users} />
      </div>
    </div>
  );
};

export default Page;
