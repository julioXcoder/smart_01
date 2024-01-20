import { IconType } from "react-icons";

interface Path {
  label: string;
  path: string;
  Icon?: IconType;
}

export const links: Path[] = [
  { path: "/applicant_portal/edit/priorities", label: "Priorities" },
  { path: "/applicant_portal/edit/profile", label: "Profile" },
  { path: "/applicant_portal/edit/contacts", label: "Contacts" },
  { path: "/applicant_portal/edit/education", label: "Education" },
  { path: "/applicant_portal/edit/documents", label: "Documents" },
];
