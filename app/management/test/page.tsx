"use client";

import DraftTabs from "@/components/applicant/draftTabs";
import toast from "react-hot-toast";
import { doSomething } from "@/server/actions/test";

const Page = () => {
  const handleDoSomething = async () => {
    const promiseResponse = doSomething();

    toast.promise(promiseResponse, {
      loading: `loading...`,
      success: <b>success!</b>,
      error: <b>error.</b>,
    });
  };

  return (
    <div onClick={handleDoSomething}>
      {/* <DraftTabs /> */}
      <button>Do something</button>
    </div>
  );
};

export default Page;
