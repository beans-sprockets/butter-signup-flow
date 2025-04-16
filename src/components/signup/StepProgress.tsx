
import React from "react";

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

const StepProgress: React.FC<StepProgressProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-gray-500">
          Step {currentStep + 1} of {totalSteps}
        </div>
        <div className="w-20 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-500 ease-in-out"
            style={{
              width: `${((currentStep + 1) / totalSteps) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default StepProgress;
