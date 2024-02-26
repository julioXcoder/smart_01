import React from "react";
import { getApplicantProgrammes } from "@/server/actions/applicant";
import SearchComponent from "./searchComponent";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import mustLogo from "@/public/logo/must.svg";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import ErrorPage from "@/components/errorPage";

interface Props {
  params: { applicantApplicationId: string };
}

const Page = async ({ params: { applicantApplicationId } }: Props) => {
  const { data, error } = await getApplicantProgrammes(applicantApplicationId);

  if (error) {
    <ErrorPage errorMessage={error} />;
  }

  if (data) {
    return (
      <div className="mx-auto max-w-6xl py-6 sm:px-4 lg:px-8 lg:py-10">
        <SearchComponent
          applicantApplicationId={applicantApplicationId}
          programmes={data}
        />
      </div>
    );
  }
};

export default Page;
