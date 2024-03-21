import MainContent from "@/components/layout/mainContent";
import prisma from "@/prisma/db";
import ResidenceManagerForm from "./residenceManagerForm";

const Page = async () => {
  async function getResidenceNames() {
    "use server";

    const residenceNames = await prisma.residenceManager.findMany({
      select: { residenceName: true },
    });

    return residenceNames;
  }

  const residenceNames = await getResidenceNames();

  return (
    <div className="p-2">
      <MainContent>
        <div className="flex flex-col gap-2 md:flex-row">
          <div>
            <h1 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              Residence List
            </h1>
            <ul className="max-w-md list-inside list-disc space-y-1 text-gray-500 dark:text-gray-400">
              {residenceNames.map((item, index) => (
                <li key={index}>{item.residenceName}</li>
              ))}
            </ul>
          </div>
          <div className="mx-auto max-w-4xl p-3">
            <h2 className="text-lg font-semibold capitalize text-gray-700 dark:text-white">
              Account settings
            </h2>
            <ResidenceManagerForm />
          </div>
        </div>
      </MainContent>
    </div>
  );
};

export default Page;
