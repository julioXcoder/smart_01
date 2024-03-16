import { Tab } from "@/types";
import Stepper from "../stepper";

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
      <Stepper activeTab={activeTab} tabs={tabs} />
      <div className="mt-10">{currentTab.content}</div>
      <div className="mt-6">
        <button
          onClick={onPrevTab}
          disabled={activeTab === 0}
          className="mr-2 rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Back
        </button>
        <button
          onClick={onNextTab}
          disabled={activeTab === tabs.length - 1}
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
