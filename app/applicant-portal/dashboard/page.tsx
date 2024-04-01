import { getApplicationDetails } from "./actions";
import Draft from "./draft";
import UnderReview from "./underReview";
import Accepted from "./accepted";
import Rejected from "./rejected";

const Page = async () => {
  const data = await getApplicationDetails();

  const {
    details: { applicationStatus },
  } = data;

  if (applicationStatus === "ACCEPTED") {
    return <Accepted />;
  }

  if (applicationStatus === "REJECTED") {
    return <Rejected />;
  }

  if (applicationStatus === "UNDER_REVIEW") {
    return (
      <UnderReview
        applicationType={data.applicationType}
        programmes={data.applicantProgrammePriorities}
      />
    );
  }

  if (applicationStatus === "DRAFT") {
    return <Draft data={data} />;
  }
};

export default Page;
