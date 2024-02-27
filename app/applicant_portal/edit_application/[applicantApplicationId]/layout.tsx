import { ReactNode } from "react";
import Appbar from "@/components/layout/appbar";
import { getApplicantDetails } from "@/server/actions/applicant";
import ErrorPage from "@/components/errorPage";

interface Props {
  children: ReactNode;
  params: { applicantApplicationId: string };
}

const Layout = async ({
  children,
  params: { applicantApplicationId },
}: Props) => {
  const { data, error } = await getApplicantDetails(applicantApplicationId);

  if (error) {
    return <ErrorPage errorMessage={error} />;
  }

  if (data) {
    return (
      <div>
        <Appbar
          username={data.username}
          notifications={data.notifications}
          imageUrl={data.imageUrl}
          fullName={`${data.firstName} ${data.lastName}`}
        />
        <div className="mx-auto my-14 max-w-[85rem] p-4 sm:p-6">{children}</div>
      </div>
    );
  }
};

export default Layout;
