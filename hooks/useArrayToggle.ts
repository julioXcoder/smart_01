import { useState } from "react";

type ArrayToggleHook<T> = [T[], (value: T) => void, () => void];

function useArrayToggle<T>(
  initialArray: T[],
): [T[], (value: T) => void, () => void] {
  const [array, setArray] = useState<T[]>(initialArray);

  const toggle = (value: T) => {
    setArray((currentArray) =>
      currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value],
    );
  };

  const reset = () => {
    setArray(initialArray);
  };

  return [array, toggle, reset];
}

export default useArrayToggle;
