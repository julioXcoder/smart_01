"use client";

import { useState, ChangeEvent } from "react";
import { SelectionOptions } from "@/utils/examination/necta/selection_";

import * as React from "react";
import { CaretSortIcon, CheckIcon, Cross1Icon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

interface SelectedItem {
  value: string;
  text: string;
}

const Page = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);

  const handleSelect = (currentValue: string) => {
    setSelectedItems([...selectedItems, { value: currentValue, text: "" }]);
    setOpen(false);
  };

  const handleDelete = (value: string) => {
    setSelectedItems(selectedItems.filter((item) => item.value !== value));
  };

  const handleTextChange = (
    event: ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    setSelectedItems(
      selectedItems.map((item) =>
        item.value === value ? { ...item, text: event.target.value } : item,
      ),
    );
  };
  return (
    <div>
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              Select framework...
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search framework..." className="h-9" />
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {frameworks
                  .filter(
                    (framework) =>
                      !selectedItems.find(
                        (item) => item.value === framework.value,
                      ),
                  )
                  .map((framework) => (
                    <CommandItem
                      key={framework.value}
                      value={framework.value}
                      onSelect={handleSelect}
                    >
                      {framework.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedItems.find(
                            (item) => item.value === framework.value,
                          )
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                    </CommandItem>
                  ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        {selectedItems.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span>{frameworks.find((f) => f.value === item.value)?.label}</span>
            <input
              type="text"
              value={item.text}
              onChange={(event) => handleTextChange(event, item.value)}
            />
            <button onClick={() => handleDelete(item.value)}>
              <Cross1Icon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
