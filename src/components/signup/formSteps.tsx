
import React from "react";
import { Globe } from "lucide-react";

export interface StepConfig {
  question: string;
  placeholder: string;
  fieldName: string;
  type?: string;
  icon?: React.ReactNode;
}

export const signupSteps: StepConfig[] = [
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
  {
    question: "What is the URL of your brand?",
    placeholder: "www.yourbrand.com",
    fieldName: "brandUrl",
    icon: <Globe className="h-5 w-5 text-gray-400" />,
  },
];
