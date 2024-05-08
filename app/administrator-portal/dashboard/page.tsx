"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const elements = [
  { value: "div1", label: "div 1", content: <div>div 1 content</div> },
  { value: "div2", label: "div 2", content: <div>div 2 content</div> },
  // Add more divs here...
];

const Page = () => {
  const [selectedElements, setSelectedElements] = useState<
    { value: string; label: string; content: JSX.Element }[]
  >([]);

  const handleSelect = (value: string) => {
    const foundElement = elements.find((el) => el.value === value);
    if (foundElement) {
      setSelectedElements([...selectedElements, foundElement]);
    }
  };

  selectedElements;

  const handleDelete = (value: string) => {
    setSelectedElements(selectedElements.filter((el) => el.value !== value));
  };

  return (
    <div>
      {" "}
      <div>
        <Select onValueChange={handleSelect}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select an element" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Elements</SelectLabel>
              {elements
                .filter(
                  (el) =>
                    !selectedElements.find(
                      (selectedEl) => selectedEl.value === el.value,
                    ),
                )
                .map((el) => (
                  <SelectItem key={el.value} value={el.value}>
                    {el.label}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div>Selected</div>
        {selectedElements.map((el) => (
          <div key={el.value}>
            {el.content}
            <button onClick={() => handleDelete(el.value)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
