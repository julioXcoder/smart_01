import { Step } from "./data";

interface Props {
  tabs: Step[];
  activeTab: number;
}

const Stepper = ({ tabs, activeTab }: Props) => {
  return (
    <ol className="z-20 flex w-full items-center">
      {tabs.map((tab, index) => (
        <li
          key={index}
          className={`relative flex w-full items-center text-sm ${
            index <= activeTab
              ? "after:border-blue-100 dark:after:border-blue-800"
              : "after:border-gray-100 dark:after:border-gray-700"
          } after:inline-block after:h-1 after:w-full after:border-4 after:border-b  after:content-[''] last:w-auto last:after:border-0 last:after:border-none`}
        >
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full lg:h-12 lg:w-12 ${
              index <= activeTab
                ? "bg-blue-100 dark:bg-blue-800"
                : "bg-gray-100 dark:bg-gray-700"
            }`}
          >
            <tab.Icon
              className={`size-4 lg:size-5 ${
                index <= activeTab
                  ? "text-blue-600 dark:text-blue-300"
                  : "text-gray-500 dark:text-gray-100"
              }`}
            />
          </span>
          <span className="absolute top-14 hidden text-xs md:text-sm">
            {tab.label}
          </span>
        </li>
      ))}
    </ol>
  );
};

export default Stepper;
