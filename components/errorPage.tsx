"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import ErrorComputer from "@/public/404-computer.svg";
import { Button } from "./ui/button";
import { IoArrowBackOutline } from "react-icons/io5";

interface Props {
  errorMessage: string;
}

const ErrorPage = ({ errorMessage }: Props) => {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-[85rem] px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-7 lg:items-center lg:gap-x-8 xl:gap-x-12">
        <div className="mt-10 lg:col-span-4 lg:mt-0">
          <Image
            className="w-full rounded-xl"
            src={ErrorComputer}
            alt="Image Description"
          />
        </div>

        <div className="px-4 py-10 text-center sm:px-6 lg:col-span-3 lg:px-8">
          <h1 className="block text-7xl font-bold text-gray-800 dark:text-white sm:text-9xl">
            ERROR
          </h1>
          <h1 className="block text-2xl font-bold text-white"></h1>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            Oops, something went wrong.
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {errorMessage}
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
            <Button
              className="w-full items-center justify-center gap-x-2 sm:w-auto"
              onClick={() => router.back()}
              variant={"secondary"}
            >
              <IoArrowBackOutline className="h-4 w-4 flex-shrink-0" />
              go back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
