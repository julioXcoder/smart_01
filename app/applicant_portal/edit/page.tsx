import EditComponent from "./editComponent";
import { getApplicationDetails } from "@/server/actions/applicant";

const Page = async () => {
  const { data, error } = await getApplicationDetails();

  // FIXME: Build an error card
  if (error) {
    <div>{error}</div>;
  }

  if (data) {
    return <EditComponent data={data} />;
  }
};

export default Page;
