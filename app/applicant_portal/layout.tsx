import Appbar from "@/components/layout/appbar";
import { ReactNode } from "react";
import { getApplicantData } from "@/server/actions/applicant";

const layout = async ({ children }: { children: ReactNode }) => {
  const { data, error } = await getApplicantData();

  // FIXME: Build an error card
  if (error) {
    <div>{error}</div>;
  }

  if (data) {
    return (
      <div>
        <Appbar
          notifications={data.notifications}
          firstName={data.firstName}
          lastName={data.lastName}
          username={data.username}
        />
        <div className="mx-auto my-14 max-w-[85rem] p-4 sm:p-6">{children}</div>
        {/* <StickyFooter /> */}
      </div>
    );
  }
};

export default layout;
