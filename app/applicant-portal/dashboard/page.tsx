import { getApplicationDetails } from "./actions";
import Draft from "./draft";

const Page = async () => {
  const data = await getApplicationDetails();
  const {
    details: { status },
  } = data;

  if (status === "DRAFT") {
    return <Draft data={data} />;
  }
};

export default Page;
