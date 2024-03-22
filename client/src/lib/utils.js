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