import { Button } from "@/components/ui/button";
import {
  TbChevronCompactRight,
  TbChevronCompactLeft,
  TbMinusVertical,
} from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import Link from "next/link";
import { FaGear } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Path } from "@/types";
import smartLogo from "@/public/logo/logo.png";
import { esb } from "@/fonts";
import Image from "next/image";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Props {
  links: Path[];
}

const SlimSidebar = ({ links }: Props) => {
  const [isExpand, setIsExpand] = useState(false);
  const pathname = usePathname();

  return (
    <aside
      className={`transition-width relative hidden h-full rounded-md bg-gray-800 shadow-md duration-300 dark:bg-gray-900 sm:block ${
        isExpand ? "w-64" : "w-20"
      }`}
    >
      <Button
        size="icon"
        variant="ghost"
        className="group absolute -right-7 top-2/4 transition-all duration-300 ease-in-out hover:!bg-transparent"
        onClick={() => setIsExpand(!isExpand)}
      >
        <TbMinusVertical size={50} className="group-hover:hidden" />
        {isExpand ? (
          <TbChevronCompactLeft
            size={35}
            className="hidden group-hover:block"
          />
        ) : (
          <TbChevronCompactRight
            size={35}
            className="hidden group-hover:block"
          />
        )}
      </Button>
      <div className="flex h-full w-full flex-col gap-6">
        <Link
          href="#"
          className={`my-4 flex items-center px-5 text-xl text-blue-300 ${esb.className}`}
        >
          <Image
            quality={100}
            src={smartLogo}
            alt="smart logo"
            className="h-10 w-auto"
          />
          <span
            className={`ml-3 capitalize transition-opacity duration-300 ease-in-out ${
              isExpand ? "opacity-100" : "opacity-0"
            }`}
          >
            SMART
          </span>
        </Link>

        <div className="flex w-full flex-1 flex-col items-start space-y-3 p-3">
          {links.map(({ title, path, Icon }, index) => (
            <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    key={index}
                    href={path}
                    className={`flex w-full transform items-center rounded-md px-3.5 py-2 text-gray-300 transition-colors duration-300 hover:bg-gray-950 hover:text-gray-200 dark:hover:bg-gray-800 ${
                      pathname.startsWith(path)
                        ? "bg-gray-950 dark:bg-gray-800"
                        : ""
                    }`}
                  >
                    <div
                      className={`absolute -left-3 top-2.5 h-2/4 w-1.5 rounded-r-sm bg-gray-200 ${
                        pathname.startsWith(path) ? "hidden" : "hidden"
                      }`}
                    ></div>
                    {Icon && (
                      <Icon
                        size={26}
                        className="flex-shrink-0 transition duration-75 group-hover:text-gray-100"
                      />
                    )}
                    <span
                      className={`ml-3 capitalize transition-opacity duration-300 ease-in-out ${
                        isExpand ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {title}
                    </span>
                  </Link>
                </TooltipTrigger>
                {isExpand ? (
                  <></>
                ) : (
                  <TooltipContent side="right">
                    <p>{title}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SlimSidebar;
