import { Button } from "@/components/ui/button";
import Link from "next/link";

const ApplicationFormCard = () => {
  return (
    <div className="p-3">
      <p>
        Ready to move forward? Click ‘Proceed with Application’ to fill out the
        comprehensive form with your course preferences, next of kin
        information, and more. This is a crucial step in your application
        process. Let’s get started!
      </p>

      <Link
        className="py-3 mt-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        href="/applicant_portal/application_form"
      >
        Proceed with Application
      </Link>
    </div>
  );
};

export default ApplicationFormCard;
