import { getCurrentYear } from "@/server/actions/university";
import MainContent from "@/components/layout/mainContent";
import NewAcademicYearForm from "./newAcademicYearForm";

const Page = async () => {
  const academicYearName = await getCurrentYear();

  return (
    <div className="p-2">
      <MainContent>
        <div className="my-5">Current Academic Year: {academicYearName}</div>
        <NewAcademicYearForm />
      </MainContent>
    </div>
  );
};

export default Page;
