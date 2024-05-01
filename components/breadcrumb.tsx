"use client";

import { Fragment } from "react";
import {
  Breadcrumb as BreadcrumbContainer,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathname = usePathname();

  // Split the current path into segments
  const pathSegments = pathname.split("/").filter((segment) => segment);

  return (
    <BreadcrumbContainer>
      <BreadcrumbList>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;

          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                {index < pathSegments.length - 1 ? (
                  <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{segment.replace("_", " ")}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index < pathSegments.length - 1 && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
