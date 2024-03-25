import HeadingThree from "@/components/typography/headingThree";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  applicationTypes,
  certificateEducationLevels,
  diplomaEducationLevels,
  EducationLevel,
  mastersEducationLevels,
  phdEducationLevels,
  postgraduateDiplomaEducationLevels,
  ProgrammeLevel,
} from "./data";

interface Props {
  onEducationChange: (
    applicationType: ProgrammeLevel,
    selectedOption: EducationLevel,
  ) => void;
  onApplicationTypeChange: (selectedOption: string) => void;
  selectedApplicationType: {
    label: string;
    value: ProgrammeLevel;
  } | null;
  selectedEducationLevel: {
    label: string;
    value: EducationLevel;
  } | null;
}

const Application = ({
  onApplicationTypeChange,
  selectedApplicationType,
  onEducationChange,
  selectedEducationLevel,
}: Props) => {
  const getEducationLevels = (applicationType: ProgrammeLevel | "") => {
    switch (applicationType) {
      case "CERTIFICATE":
        return certificateEducationLevels;
      case "DIPLOMA":
        return diplomaEducationLevels;
      case "BACHELOR":
        return postgraduateDiplomaEducationLevels;
      case "MASTERS":
        return mastersEducationLevels;
      case "PHD":
        return phdEducationLevels;
      default:
        return [];
    }
  };

  return (
    <div>
      <HeadingThree>Application type</HeadingThree>
      <div className="mt-4 space-y-4">
        <div>
          <Label>Application Type</Label>
          <Select
            onValueChange={(value: string) => {
              onApplicationTypeChange(value);
            }}
            value={selectedApplicationType?.value || ""}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Application Type</SelectLabel>
                {applicationTypes.map((applicationType) => (
                  <SelectItem
                    key={applicationType.value}
                    value={applicationType.value}
                  >
                    {applicationType.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {selectedApplicationType != null && (
          <div>
            <Label>Highest education level</Label>
            <Select
              onValueChange={(value: EducationLevel) => {
                if (selectedApplicationType) {
                  onEducationChange(selectedApplicationType.value, value);
                }
              }}
              value={selectedEducationLevel?.value || ""}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>
                    Select Your Highest Level of Education
                  </SelectLabel>
                  {getEducationLevels(selectedApplicationType?.value || "").map(
                    (item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ),
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  );
};

export default Application;
