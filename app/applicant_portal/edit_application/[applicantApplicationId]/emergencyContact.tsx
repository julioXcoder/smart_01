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
  FormDescription,
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
  draftSaving: boolean;
  isSubmitting: boolean;
}

const EmergencyContact = ({ form, draftSaving, isSubmitting }: Props) => {
  return (
    <>
      <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
        Be Safe, Stay Secure
      </h1>
      <p className="my-3 text-gray-800 dark:text-gray-400">
        For safety&rsquo;s sake, provide the contact details of your trusted
        emergency contact person.
      </p>

      <div className="my-6 grid gap-6 md:grid-cols-2">
        <div>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="emergencyContactFullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Contact Full Name</FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting || draftSaving} {...field} />
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
                    <span className="ml-1 text-xs text-gray-500">
                      (Optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting || draftSaving} {...field} />
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
                      disabled={isSubmitting || draftSaving}
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
                    <span className="ml-1 text-xs text-gray-500">
                      (Optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting || draftSaving} {...field} />
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
                    <span className="ml-1 text-xs text-gray-500">
                      (Optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting || draftSaving}
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
              name="emergencyContactStreetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emergency Contact Street Address</FormLabel>
                  <FormControl>
                    <Input disabled={isSubmitting || draftSaving} {...field} />
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
                    <Input disabled={isSubmitting || draftSaving} {...field} />
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
                    <Input disabled={isSubmitting || draftSaving} {...field} />
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
                    <Input disabled={isSubmitting || draftSaving} {...field} />
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
                          disabled={isSubmitting || draftSaving}
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
                    <Input disabled={isSubmitting || draftSaving} {...field} />
                  </FormControl>
                  <FormDescription>
                    This could be a parent, sibling, spouse, fiancée, friend, or
                    any other individual who is typically able to respond
                    promptly. Please ensure that this person is aware that they
                    have been listed as your emergency contact. Thank you for
                    your cooperation.
                  </FormDescription>
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

export default EmergencyContact;
