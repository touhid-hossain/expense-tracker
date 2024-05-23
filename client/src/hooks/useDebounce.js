import React, { useEffect, useState } from "react";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearInterval(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
