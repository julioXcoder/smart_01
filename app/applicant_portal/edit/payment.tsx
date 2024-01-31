import { IoCheckmark, IoKeyOutline } from "react-icons/io5";
import ControlNCard from "./controlNCard";
import CreateCNCard from "./createCNCard";

const controlNumber = false;
const paymentStatus = false;

const Payment = () => {
  return (
    <div>
      <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
        Wrap It Up with a Payment
      </h1>
      <p className="my-3 text-gray-800 dark:text-gray-400">
        Complete your application journey by generating a control number for the
        payment of your application fee. It&rsquo;s the final step towards your
        academic dreams.
      </p>
      <div className="my-4 p-4">
        <div>
          <ol className="relative max-w-sm border-s border-gray-200 text-gray-500 dark:border-gray-700 dark:text-gray-400">
            <li className="mb-10 ms-6">
              <span className="absolute -start-4 flex h-8 w-8 items-center justify-center rounded-full bg-green-200 ring-4 ring-white dark:bg-green-900 dark:ring-gray-900">
                <IoCheckmark className="h-3.5 w-3.5 text-green-500 dark:text-green-400" />
              </span>
              <h3 className="p-1 font-medium leading-tight">Application Fee</h3>
              {/* {controlNumber && <CreateCNCard />} */}
              <CreateCNCard />
            </li>
            <li className="ms-6">
              <span className="absolute -start-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-4 ring-white dark:bg-gray-700 dark:ring-gray-900">
                <IoKeyOutline className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
              </span>
              <h3 className="p-1 font-medium leading-tight">Control Number</h3>
              {/* {controlNumber && <ControlNCard />} */}
              <ControlNCard />
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Payment;
