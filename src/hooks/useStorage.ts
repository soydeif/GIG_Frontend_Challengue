import { useState, useEffect, useCallback } from "react";

export const useStorage = <T>(
  key: string,
  initialValue: T,
  storageType: "local" | "session" = "local"
) => {
  const storage =
    storageType === "local" ? window.localStorage : window.sessionStorage;

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = storage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error parsing ${storageType}Storage item:`, error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value);
        storage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(`Error setting ${storageType}Storage key:`, key, error);
      }
    },
    [key, storage]
  );

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        try {
          const newValue = event.newValue
            ? JSON.parse(event.newValue)
            : initialValue;
          setStoredValue(newValue);
        } catch (error) {
          console.error(
            `Error parsing new ${storageType}Storage value:`,
            error
          );
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, initialValue, storage]);

  return [storedValue, setValue] as const;
};
