import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface Props {
  steps: { label: string }[];
  step: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  onGotoStep: (stepIndex: number) => void;
}

const MobileNavigation = ({
  steps,
  step,
  onNextStep,
  onPrevStep,
  onGotoStep,
}: Props) => {
  const isLastStep = step === steps.length - 1;
  const isFirstStep = step === 0;
  const currentStep = steps[step];

  return (
    <div className="flex items-center gap-x-2">
      <Button
        disabled={isFirstStep}
        onClick={onPrevStep}
        variant="outline"
        size="icon"
      >
        <MdChevronLeft className="h-4 w-4" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{currentStep.label}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          {steps.map((item, index) => (
            <DropdownMenuCheckboxItem
              key={index}
              checked={index === step}
              onCheckedChange={() => onGotoStep(index)}
            >
              {item.label}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        disabled={isLastStep}
        onClick={onNextStep}
        variant="outline"
        size="icon"
      >
        <MdChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default MobileNavigation;
