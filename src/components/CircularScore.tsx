
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

  // Determine color based on score
  const getScoreColor = () => {
    if (score < 40) return "text-red-500";
    if (score < 70) return "text-yellow-500";
    return "text-green-500";
  };

  return (
    <div className="flex flex-col items-center justify-center animate-scale-up">
      <div className="relative w-64 h-64">
        <div className="absolute inset-0 border-8 border-gray-200 rounded-full animate-pulse"></div>
        <Progress 
          value={progress} 
          className={`w-64 h-64 rounded-full [transform:rotate(-90deg)] 
            bg-gray-200 
            before:absolute before:inset-1 before:bg-white before:rounded-full 
            after:absolute after:inset-2 after:border-4 after:border-primary after:rounded-full`}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <CountUp 
              end={score} 
              duration={2}
              className={`text-6xl font-bold ${getScoreColor()}`}
            />
            <span className="text-2xl text-gray-500 block">/100</span>
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

