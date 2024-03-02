import Appbar from "@/components/applicant/appbar";
import { getPayload } from "@/server/actions/application";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = async ({ children }: Props) => {
  const user = await getPayload();

  return (
    <>
      <Appbar username={user.id} />
      {children}
    </>
  );
};

export default Layout;
