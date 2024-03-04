import ErrorPage from "@/components/errorPage";
import { getApplicantProgrammes } from "@/server/actions/application";
import SearchComponent from "./searchComponent";

interface Props {
  params: { applicantApplicationId: string };
}

const Page = async ({ params: { applicantApplicationId } }: Props) => {
  const { programmes, status } = await getApplicantProgrammes(
    applicantApplicationId,
  );

  if (status !== "DRAFT") {
    return <ErrorPage errorMessage={`Application status: ${status}.`} />;
  } else {
    return (
      <div className="mx-auto max-w-6xl py-6 sm:px-4 lg:px-8 lg:py-10">
        <SearchComponent
          applicantApplicationId={applicantApplicationId}
          programmes={programmes}
        />
      </div>
    );
  }
};

export default Page;
