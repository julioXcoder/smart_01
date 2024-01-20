import Image from "next/image";
import Link from "next/link";
import smartLogo from "@/public/logo/logo.png";
import { esb } from "@/fonts";

const Logo = () => {
  return (
    <Link
      href="#"
      className={`inline-flex items-center gap-x-2 font-semibold lg:text-xl dark:text-white ${esb.className}`}
    >
      <Image
        quality={100}
        className="h-6 w-auto lg:h-8"
        src={smartLogo}
        alt="smart logo"
      />
      SMART
    </Link>
  );
};

export default Logo;
