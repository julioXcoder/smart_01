import { getApplications } from "@/server/actions/application";
import ApplicationList from "./applicationList";
import { Button } from "@/components/ui/button";
import { IoAdd } from "react-icons/io5";

const Page = async () => {
  const { applications, canCreateNewApplication, latestAcademicYearName } =
    await getApplications();

  return (
    <div className="mx-auto my-14 max-w-[85rem] p-4 sm:p-6">
      <div className="mt-20 w-full md:px-28">
        {canCreateNewApplication && (
          <div className="my-5 flex items-center justify-center">
            <Button className="bg-green-500 hover:bg-green-600">
              <IoAdd className="mr-2 h-4 w-4 shrink-0" />
              {`Consider Starting Your Application for ${latestAcademicYearName}?`}
            </Button>
          </div>
        )}
        <ApplicationList applications={applications} />
      </div>
    </div>
  );
};

export default Page;
