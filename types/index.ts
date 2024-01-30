import { IconType } from "react-icons";
import { ReactNode } from "react";

interface Step {
  label: string;
  stepContent: ReactNode;
  Icon?: IconType;
  errors?: number;
}

export type { Step };
