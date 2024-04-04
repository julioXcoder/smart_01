import OffBoarding from "./offBoarding";
import RulesCard from "./rulesCard";
import { hasAcceptedRules } from "./actions";

const Accepted = async () => {
  const hasAccepted = await hasAcceptedRules();

  return <div>{!hasAccepted ? <RulesCard /> : <OffBoarding />}</div>;
};

export default Accepted;
