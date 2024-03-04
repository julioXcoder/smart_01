import DraftSidebar from "@/components/applicant/draftSidebar";
import MainContent from "@/components/layout/mainContent";
import { ReactNode } from "react";
import { getApplicantDetails } from "@/server/actions/application";
import MenuDropdown from "@/components/applicant/menuDropdown";

interface Props {
  children: ReactNode;
  params: { applicantApplicationId: string };
}

const Layout = async ({
  children,
  params: { applicantApplicationId },
}: Props) => {
  const { firstName, lastName, username, imageUrl, academicYearName } =
    await getApplicantDetails(applicantApplicationId);

  return (
    <>
      <DraftSidebar
        academicYearName={academicYearName}
        username={username}
        imageUrl={imageUrl}
        fullName={`${firstName} ${lastName}`}
        applicantApplicationId={applicantApplicationId}
      />
      <div className="p-2 sm:ml-64">
        <MenuDropdown />
        <MainContent>{children}</MainContent>
      </div>
    </>
  );
};

export default Layout;
