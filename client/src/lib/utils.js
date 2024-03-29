import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Function to extract initials
export function getInitials(name) {
  if(!name) return;
  const words = name?.split(' '); // Split the full name into words
  let initials = '';

  // Iterate through each word and get the first letter (uppercase)
  for (const word of words) {
    initials += word?.charAt(0)?.toUpperCase();
  }

  return initials;
}

import { useEffect, useState } from "react";


export function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay || 500);

        return () => {
            clearTimeout(timer);
        }
    }, [value, delay]);


    return debouncedValue;
}