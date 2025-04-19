import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, LineChart } from "lucide-react";
import CountUp from "./CountUp";
import CircularScore from "./CircularScore";

interface ResultsScreenProps {
  userName: string;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({ userName }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showScore, setShowScore] = useState(true);
  const firstName = userName.split(" ")[0];

  const stats = [
    {
      title: "Productivity Boost",
      value: 42,
      unit: "%",
      description: "Average productivity increase for new customers",
      icon: <TrendingUp className="h-6 w-6 text-primary" />,
    },
    {
      title: "Time Saved",
      value: 15,
      unit: "hrs",
      description: "Hours saved weekly by teams like yours",
      icon: <LineChart className="h-6 w-6 text-primary" />,
    },
    {
      title: "Growing Community",
      value: 25000,
      unit: "+",
      description: "Professionals already using our platform",
      icon: <Users className="h-6 w-6 text-primary" />,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev < stats.length - 1 ? prev + 1 : 0));
    }, 4000);

    return () => clearInterval(interval);
  }, [stats.length]);

  const handleScoreComplete = () => {
    setShowScore(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-gray-50">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome aboard, {firstName}!
        </h1>
        
        {showScore ? (
          <CircularScore score={85} onComplete={handleScoreComplete} />
        ) : (
          <div className="animate-fade-in">
            <p className="text-xl text-gray-600 mb-12">
              Here's what you can expect with our platform
            </p>

            <div className="relative h-64 mb-12">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 ${
                    activeIndex === index
                      ? "opacity-100 translate-y-0 animate-scale-up"
                      : "opacity-0 translate-y-8 pointer-events-none"
                  }`}
                >
                  <div className="bg-white rounded-xl shadow-lg p-8 h-full flex flex-col justify-center">
                    <div className="flex justify-center mb-4">{stat.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {stat.title}
                    </h3>
                    <div className="text-5xl font-bold text-primary mb-4">
                      <CountUp end={stat.value} duration={2} />
                      {stat.unit}
                    </div>
                    <p className="text-gray-600">{stat.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mb-12">
              {stats.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === index ? "bg-primary scale-125" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <div className="space-x-4">
              <Button
                className="px-8 py-6 text-lg flex items-center gap-2"
                onClick={() => window.location.href = '/dashboard'}
              >
                Continue to Dashboard
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsScreen;
