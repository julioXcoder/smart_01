"use client";

import { usePathname } from "next/navigation";
import { Path } from "@/types";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

interface Props {
  links: Path[];
}

const NavMenu = ({ links }: Props) => {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {links.map(({ title, path, Icon }, index) => (
          <NavigationMenuItem key={index}>
            <Link href={path} legacyBehavior passHref>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                active={pathname.endsWith(path)}
              >
                {Icon && <Icon className="mr-2 size-4 flex-shrink-0" />}
                {title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavMenu;
