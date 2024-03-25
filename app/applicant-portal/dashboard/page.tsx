import { getApplicationDetails } from "./actions";
import Draft from "./draft";

const Page = async () => {
  const data = await getApplicationDetails();
  const {
    details: { status },
  } = data;

  if (status === "ACCEPTED") {
    return <div>ACCEPTED card</div>;
  }

  if (status === "REJECTED") {
    return <div>REJECTED card</div>;
  }

  if (status === "UNDER_REVIEW") {
    return <div>UNDER_REVIEW card</div>;
  }

  if (status === "DRAFT") {
    return <Draft data={data} />;
  }
};

export default Page;
