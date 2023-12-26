import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Image from "next/image";
import studentImage from "@/public/online_application/student1.png";

const Page = () => {
  return (
    <section>
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            Welcome to Your Academic Journey!
          </h1>
          <div className="flex flex-col gap-2">
            <p>
              We&apos;re thrilled to welcome you to our University Application
              Portal! Whether you&apos;re taking the first step on your academic
              journey or continuing your adventure with us, we&apos;re here to
              support you every step of the way.
            </p>
            <p>
              If this is your first visit, click &quot;Begin Application&quot;
              to start shaping your future. Our step-by-step guide will walk you
              through the application process, making it as straightforward as
              possible.
            </p>
            <p>
              If you&apos;re returning to complete your application, click
              &quot;Resume Application&quot;. You&apos;ll need the username and
              password you set up previously. Let&apos;s pick up where you left
              off and continue your journey to success.
            </p>
          </div>
          <div className="mt-4 flex gap-4">
            <Link
              href="/online_application/apply"
              className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              Begin Application
              <ArrowRightIcon className="w-5 h-5 ml-2 -mr-1" />
            </Link>

            <Link
              href="#"
              className="py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              Resume Application
            </Link>
          </div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <Image src={studentImage} alt="smart student image" />
        </div>
      </div>
    </section>
  );
};

export default Page;
