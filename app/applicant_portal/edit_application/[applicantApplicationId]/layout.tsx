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
    <ErrorPage errorMessage={error} />;
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
        <div className="mx-auto py-10 sm:px-6 lg:px-8 lg:py-14">{children}</div>
      </div>
    );
  }
};

export default Layout;
