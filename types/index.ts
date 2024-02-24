import { IconType } from "react-icons";
import { ReactNode } from "react";

interface Step {
  label: string;
  stepContent: ReactNode;
  Icon?: IconType;
  errors?: number;
}

interface Path {
  title: string;
  path: string;
  Icon?: IconType;
}

export type { Step ,Path};
