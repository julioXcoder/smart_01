import EditComponent from "./editComponent";
import { getApplicationDetails } from "@/server/actions/applicant";

interface Props {
  params: { applicantApplicationId: string };
}

const Page = async ({ params: { applicantApplicationId } }: Props) => {
  const { data, error } = await getApplicationDetails(applicantApplicationId);

  // FIXME: Build an error card
  if (error) {
    <div>{error}</div>;
  }

  if (data) {
    return (
      <div className="mt-20 w-full md:px-28">
        <EditComponent
          applicantApplicationId={applicantApplicationId}
          data={data}
        />
      </div>
    );
  }
};

export default Page;
