import React from "react";
import { getAllProgrammes } from "@/server/actions/programmes";
import SearchComponent from "./searchComponent";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import mustLogo from "@/public/logo/must.svg";
import { InfoCircledIcon } from "@radix-ui/react-icons";

const Page = async () => {
  const { data, error } = await getAllProgrammes();

  if (error) return <div className="mt-20">{error}</div>;

  return (
    <div className="max-w-5xl py-6 sm:px-4 lg:px-8 lg:py-10 mx-auto">
      <SearchComponent programmes={data} />
    </div>
  );
};

export default Page;
