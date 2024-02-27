import { getCurrentYear } from "@/server/actions/university";
import ErrorPage from "@/components/errorPage";
import NewAcademicYearForm from "./newAcademicYearForm";

const Page = async () => {
  const { data, error } = await getCurrentYear();

  if (error) return <ErrorPage errorMessage={error} />;

  if (data) {
    return (
      <div>
        <div className="my-5">Current Academic Year: {data}</div>
        <NewAcademicYearForm />
      </div>
    );
  }
};

export default Page;
