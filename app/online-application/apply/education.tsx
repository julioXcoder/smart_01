import HeadingThree from "@/components/typography/headingThree";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { applicantOrigins, Origin } from "./data";

interface Props {
  onSetOLevelChange: (value: string) => void;
  onSetFormIvIndex: (value: string) => void;
  onApplicationOriginChange: (selectedOption: string) => void;
  selectedApplicantOrigin: {
    label: string;
    value: Origin;
  } | null;
  completedOLevel: "" | "yes" | "no";
  formIVIndex: string;
}

const Education = ({
  onSetOLevelChange,
  onApplicationOriginChange,
  completedOLevel,
  selectedApplicantOrigin,
  formIVIndex,
  onSetFormIvIndex,
}: Props) => {
  return (
    <div className="md:p-6">
      <HeadingThree>Education background</HeadingThree>

      <div className="mt-4 space-y-2">
        <div>
          <Label>O Level Completion</Label>
          <Select
            onValueChange={(value: string) => {
              onSetOLevelChange(value);
            }}
            value={completedOLevel}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Have you finished O Level?</SelectLabel>
                <SelectItem key="yes" value="yes">
                  Yes
                </SelectItem>
                <SelectItem key="no" value="no">
                  No
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {completedOLevel === "yes" && (
          <div>
            <Label>Origin of Education</Label>
            <Select
              onValueChange={(value: string) => {
                onApplicationOriginChange(value);
              }}
              value={selectedApplicantOrigin?.value || ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Choose Education Background</SelectLabel>
                  {applicantOrigins.map((applicantOrigin) => (
                    <SelectItem
                      key={applicantOrigin.value}
                      value={applicantOrigin.value}
                    >
                      {applicantOrigin.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}

        {completedOLevel === "yes" && selectedApplicantOrigin != null && (
          <div>
            <Label>Form IV Index Number</Label>
            <Input
              onChange={(event) =>
                onSetFormIvIndex(event.currentTarget.value.trim())
              }
              value={formIVIndex}
              className="block w-full rounded-lg border-gray-200 px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-gray-400 dark:focus:ring-gray-600"
            />
            <div className="mt-4 rounded-lg border border-blue-500 bg-blue-50 p-5 text-sm text-gray-500 dark:bg-blue-600/[.15]">
              <div className="flex">
                <InfoCircledIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600 dark:text-white" />
                <div className="ml-3">
                  <h3 className="font-semibold text-blue-600 dark:font-medium dark:text-white">
                    Form IV Index Format
                  </h3>
                  <p className="mt-2 text-gray-800 dark:text-slate-400">
                    The required format for Form IV Index is S0129/0001/2020 or
                    P0199/0001/2020.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Education;
