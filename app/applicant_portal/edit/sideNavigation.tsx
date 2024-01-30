import { Step } from "@/types";

interface Props {
  steps: Step[];
  step: number;
  onGotoStep: (stepIndex: number) => void;
}

const SideNavigation = ({ steps, step, onGotoStep }: Props) => {
  return (
    <nav className="flex w-full flex-col flex-wrap px-6">
      <ul className="space-y-2">
        {steps.map((item, index) => (
          <li key={index}>
            <span
              className={`flex w-full cursor-pointer items-center justify-between gap-x-3.5 rounded-lg px-2.5 py-2 text-sm text-slate-700 transition duration-75 dark:text-slate-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 ${
                index === step
                  ? "bg-gray-200 dark:bg-gray-700"
                  : "hover:bg-gray-100 dark:hover:bg-gray-900 dark:hover:text-slate-300"
              }`}
              onClick={() => onGotoStep(index)}
            >
              <span className="flex items-center gap-2">
                {item.Icon && <item.Icon className="h-4 w-4 shrink-0" />}
                {item.label}
              </span>

              {item.errors !== undefined && item.errors > 0 && (
                <span className="inline-flex items-center rounded-full bg-red-500 px-1.5 py-0.5 text-xs font-medium text-white">
                  {item.errors}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNavigation;
