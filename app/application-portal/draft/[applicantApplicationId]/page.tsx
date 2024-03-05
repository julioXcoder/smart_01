import DraftContainer from "@/components/applicant/draftContainer";
import { getApplicationDetails } from "@/server/actions/application";
import ErrorPage from "@/components/errorPage";

interface Props {
  params: { applicantApplicationId: string };
}

const Page = async ({ params: { applicantApplicationId } }: Props) => {
  const data = await getApplicationDetails(applicantApplicationId);

  if (data.status !== "DRAFT") {
    return <ErrorPage errorMessage={`Application status: ${status}.`} />;
  } else {
    return (
      <DraftContainer
        academicYearName={data.academicYearName}
        applicantApplicationId={applicantApplicationId}
        applicantUsername={data.username}
        data={data.applicationData}
        programmes={data.programmes}
      />
    );
  }
};

export default Page;
