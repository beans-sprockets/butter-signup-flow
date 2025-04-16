
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import LoadingScreen from "./LoadingScreen";
import ResultsScreen from "./ResultsScreen";

interface StepProps {
  question: string;
  placeholder: string;
  fieldName: keyof FormData;
  type?: string;
}

interface FormData {
  name: string;
  email: string;
  company: string;
}

const steps: StepProps[] = [
  {
    question: "Hi there! What's your name?",
    placeholder: "Your name",
    fieldName: "name",
  },
  {
    question: "Nice to meet you! What's your work email?",
    placeholder: "name@company.com",
    fieldName: "email",
    type: "email",
  },
  {
    question: "Great! What company do you work for?",
    placeholder: "Company name",
    fieldName: "company",
  },
];

const SignupForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 600);
    }
  };

  useEffect(() => {
    focusInput();
  }, [currentStep]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleNextStep();
    }
  };

  const handleNextStep = () => {
    const currentField = steps[currentStep].fieldName;
    
    // Basic validation - ensure the field is not empty
    if (!formData[currentField].trim()) {
      return;
    }
    
    // Email validation for the email step
    if (
      currentField === "email" && 
      !/^\S+@\S+\.\S+$/.test(formData.email)
    ) {
      return;
    }
    
    setIsAnimating(true);
    
    setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        // Form is complete, show loading screen
        setIsLoading(true);
        
        // Simulate API call and then show results
        setTimeout(() => {
          setIsLoading(false);
          setIsComplete(true);
        }, 3000);
      }
      setIsAnimating(false);
    }, 500);
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep((prev) => prev - 1);
        setIsAnimating(false);
      }, 500);
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isComplete) {
    return <ResultsScreen userName={formData.name} />;
  }

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-gray-50">
      <div 
        className={`w-full max-w-md ${
          isAnimating ? "animate-fade-out" : "animate-fade-in"
        }`}
      >
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </div>
            <div className="w-20 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500 ease-in-out"
                style={{
                  width: `${((currentStep + 1) / steps.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold tracking-tight mb-6">
          {currentStepData.question}
        </h2>

        <div className="relative mb-8">
          <Input
            ref={inputRef}
            type={currentStepData.type || "text"}
            name={currentStepData.fieldName}
            value={formData[currentStepData.fieldName]}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder={currentStepData.placeholder}
            className="h-14 px-4 text-lg"
            autoComplete={currentStepData.fieldName === "email" ? "email" : "off"}
          />
          {formData[currentStepData.fieldName] && (
            <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 h-5 w-5" />
          )}
        </div>

        <div className="flex justify-between items-center">
          {currentStep > 0 ? (
            <Button
              variant="outline"
              onClick={handlePrevStep}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          ) : (
            <div></div>
          )}

          <Button
            onClick={handleNextStep}
            className="flex items-center gap-2"
            disabled={!formData[currentStepData.fieldName].trim()}
          >
            {currentStep < steps.length - 1 ? "Continue" : "Complete"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-16 text-center text-sm text-gray-500">
          <p>Press Enter ⏎ to continue</p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
