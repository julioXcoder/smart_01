import StepperForm from "./stepperForm";
import ClosedApplicationCard from "./closedApplicationCard";
import { isApplicationPeriodOpen } from "@/server/actions/application";

const Page = async () => {
  const response = await isApplicationPeriodOpen();

  return (
    <>{response === "OPEN" ? <StepperForm /> : <ClosedApplicationCard />}</>
  );
};

export default Page;
