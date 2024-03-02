import { getApplicationDetails } from "@/server/actions/application";

interface Props {
  params: { applicantApplicationId: string };
}

const Page = async ({ params: { applicantApplicationId } }: Props) => {
  const data = await getApplicationDetails(applicantApplicationId);

  return <div>Page</div>;
};

export default Page;
