
import React from "react";
import { Input } from "@/components/ui/input";
import { CheckCircle } from "lucide-react";

interface StepItemProps {
  question: string;
  placeholder: string;
  fieldName: string;
  type?: string;
  icon?: React.ReactNode;
  value: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const StepItem: React.FC<StepItemProps> = ({
  question,
  placeholder,
  fieldName,
  type = "text",
  icon,
  value,
  onInputChange,
  onKeyDown,
  inputRef,
}) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight mb-6">{question}</h2>
      <div className="relative mb-8">
        <Input
          ref={inputRef}
          type={type}
          name={fieldName}
          value={value}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="h-14 px-4 text-lg"
          autoComplete={fieldName === "email" ? "email" : "off"}
        />
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            {icon}
          </div>
        )}
        {value && (
          <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 h-5 w-5" />
        )}
      </div>
    </div>
  );
};

export default StepItem;
