import { IconType } from "react-icons";
import { ReactNode } from "react";

interface Tab {
  label: string;
  Icon: IconType;
  content: ReactNode;
}

interface Path {
  title: string;
  path: string;
  Icon?: IconType;
}

export type { Path, Tab };
