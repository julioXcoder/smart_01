import { ReactNode } from "react";
import smartLogo from "@/public/logo/logo.png";
import Image from "next/image";
import Navbar from "@/components/layout/navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-full items-center py-20">
        <div className="mx-auto w-full max-w-md p-6">
          <div className="mt-10 rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="p-4 sm:p-7">
              {/* <div className="text-center">
              <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
                Sign in
              </h1>
            </div> */}
              <div className="mx-auto flex justify-center">
                <Image
                  quality={100}
                  className="h-7 w-auto sm:h-8"
                  src={smartLogo}
                  alt="smart logo"
                />
              </div>
              <div className="mt-6">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
