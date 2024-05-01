import { useState } from "react";

function useArrayToggle<T>(initialArray: T[]) {
  const [array, setArray] = useState<T[]>(initialArray);

  const toggle = (value: T) => {
    setArray((currentArray) =>
      currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value],
    );
  };

  return [array, toggle] as const;
}

export default useArrayToggle;
