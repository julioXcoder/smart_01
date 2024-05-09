"use client";

import { useForm, useFieldArray, Controller, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { CaretSortIcon, CheckIcon, Cross1Icon } from "@radix-ui/react-icons";
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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

interface FormValue {
  value: string;
  text: string;
}

// Define the form schema
interface FormValues {
  selectedItems: FormValue[];
}

// Define the form schema
const FormSchema = z.array(
  z.object({
    value: z.string(),
    text: z.string().min(1),
  }),
);

export default function Page() {
  const [open, setOpen] = useState<boolean>(false);
  const { control, handleSubmit, getValues } = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "selectedItems",
  });

  const handleSelect = (currentValue: string) => {
    append({ value: currentValue, text: "" });
    setOpen(false);
  };

  const onSubmit = (data: FormValues) => {
    console.log(data.selectedItems);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              Select language...
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandEmpty>No language found.</CommandEmpty>
              <CommandGroup>
                {languages
                  .filter(
                    (language) =>
                      !fields.find((item) => item.value === language.value),
                  )
                  .map((language) => (
                    <CommandItem
                      key={language.value}
                      value={language.value}
                      onSelect={handleSelect}
                    >
                      {language.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          fields.find((item) => item.value === language.value)
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
        {fields.map((item, index) => (
          <div key={item.id} className="flex items-center space-x-2">
            <span>{languages.find((f) => f.value === item.value)?.label}</span>
            <Controller
              control={control}
              name={`selectedItems.${index}.text` as const}
              defaultValue=""
              render={({ field }) => (
                <Input
                  type="text"
                  value={field.value || ""}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    console.log(`Name: ${field.name},Value: ${field.value}`);
                  }}
                />
              )}
            />
            <button type="button" onClick={() => remove(index)}>
              <Cross1Icon className="h-4 w-4" />
            </button>
          </div>
        ))}
        <Button type="submit" onClick={() => console.log(getValues())}>
          Submit
        </Button>
      </form>
    </div>
  );
}
