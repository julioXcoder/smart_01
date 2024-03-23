import ErrorPage from "@/components/errorPage";
import { cookies } from "next/headers";

const Page = () => {
  const cookieStore = cookies();
  const theme = cookieStore.get("session");

  return (
    <div>
      Dashboard page
      <ErrorPage errorMessage="Cant access this page" />
    </div>
  );
};

export default Page;
