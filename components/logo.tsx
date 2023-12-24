import Image from "next/image";
import Link from "next/link";
import smartLogo from "@/public/logo/smart.png";
import { esb } from "@/fonts";

const Logo = () => {
  return (
    <Link
      href="#"
      className={`m-2 inline-flex items-center gap-x-2 text-2xl font-semibold dark:text-white ${esb.className}`}
    >
      <div className="flex items-center justify-center rounded-sm bg-blue-300 px-1.5 py-1 shadow-sm">
        <Image
          color="red"
          quality={100}
          className="h-auto w-10"
          src={smartLogo}
          alt="smart logo"
        />
      </div>
      SMART
    </Link>
  );
};

export default Logo;
