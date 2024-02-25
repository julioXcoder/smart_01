import StepperForm from "./stepperForm";
import ClosedApplicationCard from "./closedApplicationCard";
import { isApplicationPeriodOpen } from "@/server/actions/applicant";

const Page = async () => {
  const { data, error } = await isApplicationPeriodOpen();

  if (error) return <div>{error}</div>;

  if (data) {
    {
      data === "OPEN" ? <StepperForm /> : <ClosedApplicationCard />;
    }
  }
};

export default Page;
