import { getApplicationDetails } from "@/server/actions/application";
import Draft from "@/components/applicant/draft";

interface Props {
  params: { applicantApplicationId: string };
}

const Page = async ({ params: { applicantApplicationId } }: Props) => {
  const data = await getApplicationDetails(applicantApplicationId);

  return <Draft data={data} applicantApplicationId={applicantApplicationId} />;
};

export default Page;
