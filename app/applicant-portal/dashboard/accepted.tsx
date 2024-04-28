import OnBoarding from "./onBoarding";
import RulesCard from "./rulesCard";
import { hasAcceptedRules } from "./actions";

const Accepted = async () => {
  const hasAccepted = await hasAcceptedRules();

  return <div>{!hasAccepted ? <RulesCard /> : <OnBoarding />}</div>;
};

export default Accepted;
