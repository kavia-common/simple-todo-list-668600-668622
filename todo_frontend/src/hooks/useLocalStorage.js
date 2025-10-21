import { useEffect, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * useLocalStorage - React hook to persist state to localStorage safely.
 * @param {string} key - Storage key.
 * @param {any} initialValue - Initial value if nothing in storage.
 * @returns {[any, Function]} - State value and setter compatible with useState API.
 */
export function useLocalStorage(key, initialValue) {
  const readValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      // Fallback if JSON parse fails or access denied
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(readValue);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Ignore write errors (quota, privacy mode)
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
