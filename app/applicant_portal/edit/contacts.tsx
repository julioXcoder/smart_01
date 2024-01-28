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

const Contacts = ({ form }: Props) => {
  return (
    <form className="my-6 grid gap-6 md:grid-cols-2">
      <div>
        <div className="mb-5">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            Applicant contact
          </h3>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
            Enter your primary contact details.
          </p>
        </div>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="applicantEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="flex items-center gap-2">
                    Applicant Email
                    <span className="text-xs text-gray-500">(Optional)</span>
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
                <FormLabel>
                  <span className="flex items-center gap-0.5">
                    Phone Number
                    <FaStarOfLife className="mt-0.5 h-2 w-2 shrink-0 text-red-500" />
                  </span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter your phone number" {...field} />
                </FormControl>
                <FormDescription>
                  Please include the country code, e.g +255 12345678
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <h1 className="text-lg font-bold text-green-400 dark:text-white">
            Address
          </h1>
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
      <div>
        <div className="mb-5">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
            Emergency contact
          </h3>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
            Enter the contact details of a person reachable in emergencies.
          </p>
        </div>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="emergencyContactEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="flex items-center gap-2">
                    Emergency Contact Email
                    <span className="text-xs text-gray-500">(Optional)</span>
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
            name="emergencyContactPhoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <span className="flex items-center gap-0.5">
                    Emergency contact Phone Number
                    <FaStarOfLife className="mt-0.5 h-2 w-2 shrink-0 text-red-500" />
                  </span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter emergency contact phone number"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Please include the country code, e.g +255 12345678
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <h1 className="text-lg font-bold text-green-400 dark:text-white">
            Emergency Contact Address
          </h1>
          <FormField
            control={form.control}
            name="emergencyContactStreetAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact Street Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your emergency contact street address"
                    {...field}
                  />
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
                  <Input
                    placeholder="Enter your emergency contact city, town or your village"
                    {...field}
                  />
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
                  <Input
                    placeholder="Enter your emergency contact region, province or your county"
                    {...field}
                  />
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
                  <Input
                    placeholder="Enter your emergency contact postal code"
                    {...field}
                  />
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
          <FormField
            control={form.control}
            name="emergencyContactRelation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emergency Contact Relation</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your emergency contact relation to you"
                    {...field}
                  />
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

export default Contacts;
