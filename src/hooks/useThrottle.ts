import { useRef, useState } from "react";

// throttle: delay 期间内只执行一次
export const useThrollte = (fn: Function, delay: number) => {
  // 使用setInterval
  const timer = useRef<NodeJS.Timeout>();
  const [flag, setFlag] = useState<boolean>(true);
  return (...args: any[]) => {
    if (!flag) return;
    setFlag(false);
    timer.current = setTimeout(() => {
      fn.apply(null, args);
      setFlag(true);
    }, delay);
  };
};
