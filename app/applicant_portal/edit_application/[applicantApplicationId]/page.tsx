import EditComponent from "./editComponent";
import { getApplicationDetails } from "@/server/actions/applicant";
import ErrorPage from "@/components/errorPage";

interface Props {
  params: { applicantApplicationId: string };
}

const Page = async ({ params: { applicantApplicationId } }: Props) => {
  const { data, error } = await getApplicationDetails(applicantApplicationId);

  if (error) {
    return <ErrorPage errorMessage={error} />;
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
