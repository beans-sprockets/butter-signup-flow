
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

const messages = [
  "Crunching the numbers...",
  "Analyzing your industry...",
  "Getting insights ready...",
  "Checking your brand presence...",
  "Almost there...",
];

const LoadingScreen: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev < messages.length - 1 ? prev + 1 : prev));
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-white to-gray-50">
      <div className="text-center animate-fade-in">
        <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-8" />
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          {messages[currentMessage]}
        </h2>
        <p className="text-gray-500">
          We're preparing your personalized insights
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
