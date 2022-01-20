import { useEffect, useState } from "react";

function useDelay([newValue, delay, defaultValue]) {
  const [timer, setTimer] = useState(null);
  const [currentValue, setCurrentValue] = useState(defaultValue);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(setTimeout(() => setCurrentValue(newValue), delay));
  }, [newValue]);

  return [currentValue];
}

export default useDelay;
