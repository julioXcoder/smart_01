import { useState } from "react";
import { IoCheckmark, IoKeyOutline } from "react-icons/io5";
import { BsCreditCard2BackFill } from "react-icons/bs";
import { generateControlNumber } from "@/server/actions/applicant";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import ControlNCard from "./controlNCard";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { ApplicantControlNumber } from "@/types/application";

interface Props {
  applicantApplicationId: string;
  applicantControlNumber: ApplicantControlNumber;
  draftSaving: boolean;
  isSubmitting: boolean;
}

const Payment = ({
  applicantApplicationId,
  applicantControlNumber,
  draftSaving,
  isSubmitting,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGenerateControlNumber = async () => {
    setErrorMessage("");
    setIsLoading(true);
    const responsePromise = generateControlNumber(applicantApplicationId);

    toast.promise(responsePromise, {
      loading: "Generating your unique control number...",
      success: <b>Control number generated successfully!</b>,
      error: <b>Oops! Something went wrong. Please try again.</b>,
    });

    const response = await responsePromise;

    if (response.error) setErrorMessage(response.error);
    setIsLoading(false);
  };

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
              {applicantControlNumber.controlNumber ? (
                <span className="absolute -start-4 flex h-8 w-8 items-center justify-center rounded-full bg-green-200 ring-4 ring-white dark:bg-green-900 dark:ring-gray-900">
                  <IoCheckmark className="h-3.5 w-3.5 text-green-500 dark:text-green-400" />
                </span>
              ) : (
                <span className="absolute -start-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-4 ring-white dark:bg-gray-700 dark:ring-gray-900">
                  <BsCreditCard2BackFill className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
                </span>
              )}
              <h3 className="p-1 font-medium leading-tight">Application Fee</h3>
              <div className="p-3">
                <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-400">
                  To proceed with your application, a fee of 10,000 Tanzanian
                  Shillings is required.
                </p>
                {/* FIXME: return ! */}
                {applicantControlNumber.controlNumber && (
                  <div className="mt-4">
                    <p className="mb-2 text-sm text-gray-700 dark:text-gray-400">
                      Click the button below to generate the control number:
                    </p>

                    <Button
                      disabled={isLoading || isSubmitting || draftSaving}
                      onClick={handleGenerateControlNumber}
                      className="w-full"
                      type="button"
                    >
                      Generate Control Number
                    </Button>
                  </div>
                )}
              </div>
            </li>
            <li className="ms-6">
              <span className="absolute -start-4 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-4 ring-white dark:bg-gray-700 dark:ring-gray-900">
                <IoKeyOutline className="h-3.5 w-3.5 text-gray-500 dark:text-gray-400" />
              </span>
              <h3 className="p-1 font-medium leading-tight">Control Number</h3>
              {applicantControlNumber.controlNumber && (
                <ControlNCard
                  controlNumber={applicantControlNumber.controlNumber}
                  status={applicantControlNumber.status}
                />
              )}
            </li>
          </ol>
        </div>
      </div>
      {errorMessage && (
        <div className="flex items-center gap-2 text-sm text-red-500">
          <ExclamationTriangleIcon className="mt-0.5 h-4 w-4 shrink-0" />
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default Payment;
