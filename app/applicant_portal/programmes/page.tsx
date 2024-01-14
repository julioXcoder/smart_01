import React from "react";
import { getAllProgrammes } from "@/server/actions/programmes";
import SearchComponent from "./searchComponent";

const Page = async () => {
  const { data, error } = await getAllProgrammes();

  if (error) return <div className="mt-20">{error}</div>;

  return (
    <div>
      <div className="mt-20">
        {data?.map((item, index) => (
          <div key={index}>
            {item.name},{item.campus.location},{item.level}
          </div>
        ))}
      </div>
      <div className="mt-10">
        <SearchComponent />
      </div>
    </div>
  );
};

export default Page;
