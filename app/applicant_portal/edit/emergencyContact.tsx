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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { UseFormReturn, UseFormRegister } from "react-hook-form";
import { BiCheck, BiChevronDown, BiSolidWatch, BiTime } from "react-icons/bi";
import z from "zod";
import { countries, FormSchema } from "./data";
import { FaStarOfLife, FaExclamation } from "react-icons/fa6";

interface Props {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
}

const EmergencyContact = ({ form }: Props) => {
  return (
    <form className="my-6 grid gap-6 md:grid-cols-2">
      <div>
        <div className="mb-5">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            Emergency contact
          </h3>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
            Enter the contact details of a person reachable in emergencies.
          </p>
        </div>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="emergencyContactFullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact Full Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emergencyContactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Emergency Contact Email
                  <span className="ml-1 text-xs text-gray-500">(Optional)</span>
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
            name="emergencyContactPhoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency contact Phone Number</FormLabel>
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
            name="emergencyContactAlternativeEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Emergency Contact Alternative Email
                  <span className="ml-1 text-xs text-gray-500">(Optional)</span>
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
            name="emergencyContactAlternativePhoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Emergency Contact Alternative Phone Number
                  <span className="ml-1 text-xs text-gray-500">(Optional)</span>
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
        <div className="mb-5">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            Emergency Address
          </h3>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
            Specify the location of your emergency contact.
          </p>
        </div>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="emergencyContactStreetAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact Street Address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emergencyContactCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact City, town, village</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emergencyContactRegion"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Emergency Contact Region, province, county
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
            name="emergencyContactPostalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact Postal Code</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emergencyContactCountry"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Emergency Contact Country</FormLabel>
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
                          : "Select emergency contact country"}
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
                                form.setValue(
                                  "emergencyContactCountry",
                                  country.value,
                                );
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
          <FormField
            control={form.control}
            name="emergencyContactRelation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact Relation</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  This could be a parent, sibling, spouse, fiancée, friend, or
                  any other individual who is typically able to respond
                  promptly. Please ensure that this person is aware that they
                  have been listed as your emergency contact. Thank you for your
                  cooperation.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </form>
  );
};

export default EmergencyContact;
