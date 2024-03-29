import { getApplicationDetails } from "./actions";
import Draft from "./draft";

const Page = async () => {
  const data = await getApplicationDetails();

  const {
    details: { applicationStatus },
  } = data;

  if (applicationStatus === "ACCEPTED") {
    return <div>ACCEPTED card</div>;
  }

  if (applicationStatus === "REJECTED") {
    return <div>REJECTED card</div>;
  }

  if (applicationStatus === "UNDER_REVIEW") {
    return <div>UNDER_REVIEW card</div>;
  }

  if (applicationStatus === "DRAFT") {
    return <Draft data={data} />;
  }
};

export default Page;
