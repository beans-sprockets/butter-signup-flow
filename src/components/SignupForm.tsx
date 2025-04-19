
import React, { useState, useRef, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";
import ResultsScreen from "./ResultsScreen";
import StepItem from "./signup/StepItem";
import StepNavigation from "./signup/StepNavigation";
import StepProgress from "./signup/StepProgress";
import { signupSteps } from "./signup/formSteps";
import { validateField } from "@/utils/formValidation";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface FormData {
  name: string;
  email: string;
  company: string;
  brandUrl: string;
  [key: string]: string;
}

const SignupForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    brandUrl: "",
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Ensure signupSteps is valid and not empty
  if (!signupSteps || signupSteps.length === 0) {
    console.error("signupSteps is undefined or empty");
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">Configuration Error</h2>
          <p className="mt-2 text-gray-600">Unable to load form steps. Please try again later.</p>
        </div>
      </div>
    );
  }

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

  const handleNextStep = async () => {
    // Ensure currentStep is within bounds
    if (currentStep >= signupSteps.length) {
      console.error("Current step is out of bounds");
      return;
    }

    const currentField = signupSteps[currentStep].fieldName;
    
    // Validate the current field
    if (!validateField(currentField, formData[currentField])) {
      return;
    }
    
    setIsAnimating(true);
    
    if (currentStep < signupSteps.length - 1) {
      setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
        setIsAnimating(false);
      }, 500);
    } else {
      // Form is complete, show loading screen
      setIsLoading(true);
      
      try {
        // Submit data to Supabase
        const { error } = await supabase
          .from('signups')
          .insert([
            {
              name: formData.name,
              email: formData.email,
              company: formData.company,
              brand_url: formData.brandUrl
            }
          ]);

        if (error) {
          throw error;
        }

        // Show success screen after brief delay
        setTimeout(() => {
          setIsLoading(false);
          setIsComplete(true);
        }, 1500);
      } catch (error: any) {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message || "Failed to submit signup form. Please try again.",
        });
      }
    }
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

  // Ensure currentStep is within bounds before accessing
  if (currentStep >= signupSteps.length) {
    console.error("Current step index out of bounds", currentStep, signupSteps.length);
    setCurrentStep(0); // Reset to first step if out of bounds
    return null; // Prevent render while resetting
  }

  const currentStepData = signupSteps[currentStep];
  const isLastStep = currentStep === signupSteps.length - 1;

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-gray-50">
      <div 
        className={`w-full max-w-md ${
          isAnimating ? "animate-fade-out" : "animate-fade-in"
        }`}
      >
        <StepProgress 
          currentStep={currentStep} 
          totalSteps={signupSteps.length} 
        />

        <StepItem
          question={currentStepData.question}
          placeholder={currentStepData.placeholder}
          fieldName={currentStepData.fieldName}
          type={currentStepData.type}
          icon={currentStepData.icon}
          value={formData[currentStepData.fieldName]}
          onInputChange={handleInputChange}
          onKeyDown={handleKeyPress}
          inputRef={inputRef}
        />

        <StepNavigation
          currentStep={currentStep}
          isFormFieldEmpty={!formData[currentStepData.fieldName].trim()}
          onNextStep={handleNextStep}
          onPrevStep={handlePrevStep}
          isLastStep={isLastStep}
        />

        <div className="mt-16 text-center text-sm text-gray-500">
          <p>Press Enter ⏎ to continue</p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
