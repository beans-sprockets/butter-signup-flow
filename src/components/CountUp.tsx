import React, { useState, useEffect } from "react";

interface CountUpProps {
  end: number;
  duration?: number;
  start?: number;
  className?: string;
}

const CountUp: React.FC<CountUpProps> = ({
  end,
  duration = 2,
  start = 0,
  className = "",
}) => {
  const [count, setCount] = useState(start);
  
  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    
    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressRatio = Math.min(progress / (duration * 1000), 1);
      
      const easedProgress = progressRatio < 0.5
        ? 2 * progressRatio * progressRatio
        : 1 - Math.pow(-2 * progressRatio + 2, 2) / 2;
      
      const currentCount = Math.floor(easedProgress * (end - start) + start);
      setCount(currentCount);
      
      if (progressRatio < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(end);
      }
    };
    
    animationFrame = requestAnimationFrame(updateCount);
    
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, start]);
  
  return <span className={className}>{count.toLocaleString()}</span>;
};

export default CountUp;
