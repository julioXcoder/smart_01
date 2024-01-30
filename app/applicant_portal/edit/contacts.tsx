import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { BiCheck, BiChevronDown } from "react-icons/bi";
import z from "zod";
import { FormSchema, countries } from "./data";

interface Props {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
}

const Contacts = ({ form }: Props) => {
  return (
    <>
      <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
        Stay Connected
      </h1>
      <p className="my-3 text-gray-800 dark:text-gray-400">
        Keep the conversation flowing! Share your contact details with us for
        smooth communication throughout your application journey.
      </p>
      <div className="my-6 grid gap-6 md:grid-cols-2">
        <div>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="applicantEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Applicant Email
                    <span className="ml-1 text-xs text-gray-500">
                      (Optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="applicantPhoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Include country code, e.g., +25512345678"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="applicantAlternativeEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Applicant Alternative Email
                    <span className="ml-1 text-xs text-gray-500">
                      (Optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="applicantAlternativePhoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Applicant Alternative PhoneNumber
                    <span className="ml-1 text-xs text-gray-500">
                      (Optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Include country code, e.g., +25512345678"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your street address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City, town, village</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your City, town or your village"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region, province, county</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your Region, province or your county"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your postal code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Country</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? countries.find(
                                (country) => country.value === field.value,
                              )?.label
                            : "Select country"}
                          <BiChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search country..." />
                        <CommandList>
                          <CommandEmpty>No country found.</CommandEmpty>
                          <CommandGroup>
                            {countries.map((country) => (
                              <CommandItem
                                value={country.label}
                                key={country.value}
                                onSelect={() => {
                                  form.setValue("country", country.value);
                                }}
                              >
                                <BiCheck
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    country.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                                {country.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacts;
