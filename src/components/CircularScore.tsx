
import React, { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import CountUp from "./CountUp";

interface CircularScoreProps {
  score: number;
  onComplete: () => void;
}

const CircularScore: React.FC<CircularScoreProps> = ({ score, onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Start the progress animation
    const timeout = setTimeout(() => {
      setProgress(score);
    }, 100);

    // Trigger the completion callback after the animation
    const completionTimeout = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearTimeout(timeout);
      clearTimeout(completionTimeout);
    };
  }, [score, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center animate-scale-up">
      <div className="relative w-48 h-48">
        <Progress 
          value={progress} 
          className="w-48 h-48 rounded-full [transform:rotate(-90deg)]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <CountUp 
              end={score} 
              duration={2}
              className="text-5xl font-bold text-primary"
            />
            <span className="text-2xl text-gray-500">/100</span>
          </div>
        </div>
      </div>
      <h2 className="mt-6 text-2xl font-semibold text-gray-800">
        Your Brand Score
      </h2>
    </div>
  );
};

export default CircularScore;
