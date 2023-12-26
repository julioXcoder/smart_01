import Link from "next/link";
import { esb } from "@/fonts";

const Footer = () => {
  return (
    <footer className="m-4 rounded-lg bg-white shadow dark:bg-gray-800">
      <div className="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400 sm:text-center">
          © 2024{" "}
          <Link href="" className={`hover:underline ${esb.className}`}>
            SMART
          </Link>
          . All Rights Reserved.
        </span>
        <ul className="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link href="#" className="me-4 hover:underline md:me-6">
              About
            </Link>
          </li>
          <li>
            <Link href="#" className="me-4 hover:underline md:me-6">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link href="#" className="me-4 hover:underline md:me-6">
              Licensing
            </Link>
          </li>
          <li>
            <Link href="#" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
