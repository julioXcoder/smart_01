import Image from "next/image";
import Link from "next/link";
import smartLogo from "@/public/logo/logo.png";
import { esb } from "@/fonts";

const Logo = () => {
  return (
    <Link
      href="#"
      className={`m-2 inline-flex items-center gap-x-2 text-xl font-semibold dark:text-white ${esb.className}`}
    >
      <Image
        color="red"
        quality={100}
        className="h-10 w-auto"
        src={smartLogo}
        alt="smart logo"
      />
      SMART
    </Link>
  );
};

export default Logo;
