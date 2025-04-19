
import React, { useEffect, useState } from "react";
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
    if (score < 40) return "#ef4444"; // red-500
    if (score < 70) return "#eab308"; // yellow-500
    return "#22c55e"; // green-500
  };

  // Calculate stroke-dasharray and stroke-dashoffset for circle animation
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center animate-scale-up">
      <div className="relative w-64 h-64">
        <svg className="w-full h-full" viewBox="0 0 256 256">
          {/* Background circle */}
          <circle 
            cx="128" 
            cy="128" 
            r={radius} 
            fill="none" 
            stroke="#e5e7eb" 
            strokeWidth="12"
            className="animate-pulse opacity-50" 
          />
          
          {/* Progress circle */}
          <circle 
            cx="128" 
            cy="128" 
            r={radius} 
            fill="none" 
            stroke={getScoreColor()}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            transform="rotate(-90 128 128)"
            className="transition-all duration-1000 ease-in-out"
          />
          
          {/* Inner white circle */}
          <circle 
            cx="128" 
            cy="128" 
            r={radius - 14} 
            fill="white" 
            stroke="white"
            strokeWidth="2"
          />
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <CountUp 
              end={score} 
              duration={2}
              className={`text-6xl font-bold`}
              style={{ color: getScoreColor() }}
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
