import { Tab } from "@/types";
import Stepper from "../stepper";
import { Button } from "../ui/button";

interface Props {
  tabs: Tab[];
  activeTab: number;
  onNextTab: () => void;
  onPrevTab: () => void;
}

const Home = ({ activeTab, tabs, onNextTab, onPrevTab }: Props) => {
  const currentTab = tabs[activeTab];
  return (
    <div>
      {/* <Stepper activeTab={activeTab} tabs={tabs} /> */}
      <div className="mt-10">{currentTab.content}</div>
      <div className="mt-6">
        <Button onClick={onPrevTab} disabled={activeTab === 0}>
          Previous page
        </Button>
        <Button onClick={onNextTab} disabled={activeTab === tabs.length - 1}>
          Next page
        </Button>
      </div>
    </div>
  );
};

export default Home;
