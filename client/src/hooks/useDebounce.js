import { useEffect, useState } from "react";

function useDebounce(value, delay, cb) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
      cb && value && cb();
    }, delay);

    return () => {
      clearInterval(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
