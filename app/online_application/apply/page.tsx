import StepperForm from "./stepperForm";
import ClosedApplicationCard from "./closedApplicationCard";
import { isApplicationPeriodOpen } from "@/server/actions/applicant";
import ErrorPage from "@/components/errorPage";

const Page = async () => {
  const { data, error } = await isApplicationPeriodOpen();

  if (error) {
    <ErrorPage errorMessage={error} />;
  }

  if (data) {
    return <>{data === "OPEN" ? <StepperForm /> : <ClosedApplicationCard />}</>;
  }
};

export default Page;
