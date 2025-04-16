
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface StepNavigationProps {
  currentStep: number;
  isFormFieldEmpty: boolean;
  onNextStep: () => void;
  onPrevStep: () => void;
  isLastStep: boolean;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStep,
  isFormFieldEmpty,
  onNextStep,
  onPrevStep,
  isLastStep,
}) => {
  return (
    <div className="flex justify-between items-center">
      {currentStep > 0 ? (
        <Button
          variant="outline"
          onClick={onPrevStep}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      ) : (
        <div></div>
      )}

      <Button
        onClick={onNextStep}
        className="flex items-center gap-2"
        disabled={isFormFieldEmpty}
      >
        {!isLastStep ? "Continue" : "Complete"}
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default StepNavigation;
