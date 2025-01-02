import { useEffect, useState } from "react";

type TValue = string;
type TDelay = number;
export function useDebounce(value: TValue, delay: TDelay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
