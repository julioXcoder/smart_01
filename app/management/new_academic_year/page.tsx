import { getCurrentYear } from "@/server/actions/university";
import ErrorPage from "@/components/errorPage";
import NewAcademicYearForm from "./newAcademicYearForm";

const Page = async () => {
  const academicYearName = await getCurrentYear();

  return (
    <div>
      <div className="my-5">Current Academic Year: {academicYearName}</div>
      <NewAcademicYearForm />
    </div>
  );
};

export default Page;
