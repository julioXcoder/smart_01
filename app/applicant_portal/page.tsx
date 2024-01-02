import Badge from "@/components/badge";
import { BellIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Stepper from "./stepper";
import { CheckIcon, MobileIcon, ReaderIcon } from "@radix-ui/react-icons";
import CreateCNCard from "./createCNCard";
import ControlNCard from "./controlNCard";
import ApplicationFormCard from "./applicationFormCard";

const controlNumber = false;
const paymentStatus = false;

<div>
  <h1 className="text-4xl font-extrabold dark:text-white">
    Welcome,
    <small className="ms-2 font-semibold text-gray-500 dark:text-gray-400">
      John Doe
    </small>
  </h1>
  <div className="my-4 p-4">
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* Left Column: Application Summary */}
      <div className="mb-4 md:mb-0">
        <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Application Summary
            </h5>
          </a>

          <div className="m-3 text-gray-700 dark:text-gray-400">
            <p className="mb-4">
              <span className="font-bold">Form IV Index:</span> S0129/0001/2020
            </p>
            <p className="mb-4">
              <span className="font-bold">Application Status:</span>{" "}
              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
                In Review
              </span>
            </p>
            <p className="mb-4">
              <span className="font-bold">Application Type:</span> Certificate
            </p>
            {/* <p className="mb-4">
            <span className="font-bold">Control Number:</span>{" "}
            C-123456789
          </p>
          <p className="mb-4">
            <span className="font-bold">Control Number Status:</span>{" "}
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              PENDING
            </span>
          </p> */}
          </div>
        </div>
      </div>

      {/* Right Column: Notification Section */}
      <div>
        <div className="max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Application Fee
            </h5>
          </a>
          <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-400">
            To proceed with your application, a fee of 10,000 Tanzanian
            Shillings is required. Please ensure payment within four days to
            avoid account deletion.
          </p>
          <div className="mt-4">
            <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">
              Click the button below to create the control number:
            </p>
            <Button className="w-full" type="button">
              Create Control Number
            </Button>
          </div>
        </div>

        <div className="my-4">
          <Button
            className="block w-32 rounded-lg bg-green-700 px-4 py-2 text-center font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            type="button"
          >
            Pay
          </Button>
        </div>
      </div>
    </div>
  </div>
</div>;

const Page = () => {
  return (
    <div className="px-5 py-8 md:px-20 xl:px-36">
      <div>
        <div>
          <ol className="relative max-w-sm text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400">
            <li className="mb-10 ms-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-green-200 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-green-900">
                <CheckIcon className="w-3.5 h-3.5 text-green-500 dark:text-green-400" />
              </span>
              <h3 className="font-medium leading-tight p-1">Application Fee</h3>
              {controlNumber && <CreateCNCard />}
            </li>
            <li className="mb-10 ms-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                <MobileIcon className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
              </span>
              <h3 className="font-medium leading-tight p-1">Control Number</h3>
              {controlNumber && <ControlNCard />}
            </li>
            <li className="ms-6">
              <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 dark:bg-gray-700">
                <ReaderIcon className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
              </span>
              <h3 className="font-medium leading-tight p-1">
                Application Details Form
              </h3>
              <ApplicationFormCard />
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Page;
