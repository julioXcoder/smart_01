import { getApplicationPeriodStatus } from "../actions";
import StepperForm from "./stepperForm";

const Page = async () => {
  const data = await getApplicationPeriodStatus();

  return (
    <div>
      <StepperForm latestAcademicYearId={data.latestAcademicYearId} />
    </div>
  );
};

export default Page;
