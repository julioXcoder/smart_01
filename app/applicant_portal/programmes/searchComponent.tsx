"use client";

import { useState, useEffect, useRef } from "react";
import { CheckIcon, CaretDownIcon } from "@radix-ui/react-icons";

const options = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
  // Add more options as needed
];

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
}

const SearchComponent = () => {
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: Option) => {
    const isSelected = selectedOptions.some(
      (selected) => selected.value === option.value
    );

    if (isSelected) {
      const updatedOptions = selectedOptions.filter(
        (selected) => selected.value !== option.value
      );
      setSelectedOptions(updatedOptions);
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div>
      <div className="relative inline-block text-left" ref={ref}>
        <div>
          <span
            className="rounded-md shadow-sm cursor-pointer border border-gray-300 px-4 py-2 inline-flex justify-between items-center"
            onClick={handleToggle}
          >
            Select options
            <CaretDownIcon className="ml-2" />
          </span>
        </div>
        {isOpen && (
          <div className="origin-top-right absolute left-0 mt-2 w-56 ring-1 ring-black ring-opacity-5 z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
            <div
              className="py-1"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              {options.map((option) => (
                <div
                  key={option.value}
                  className={`flex leading-5 cursor-pointer focus:outline-none select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-gray-100 text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300 dark:focus:bg-gray-700`}
                  onClick={() => handleSelect(option)}
                >
                  <CheckIcon
                    className={`mr-2 ${
                      selectedOptions.some(
                        (selected) => selected.value === option.value
                      )
                        ? ""
                        : "invisible"
                    }`}
                  />
                  {option.label}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div>
        {selectedOptions.map((item, index) => (
          <div key={index}>{item.label}</div>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
