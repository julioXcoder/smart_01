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
import { FaStarOfLife } from "react-icons/fa6";

interface Props {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
}

const Contacts = ({ form }: Props) => {
  return (
    <div className="my-6 grid gap-6 md:grid-cols-2">
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
                <FormLabel>Applicant Email</FormLabel>
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
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
          Emergency contact
        </h3>
        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
          Enter the contact details of a person reachable in emergencies.
        </p>
        <div className="space-y-4"></div>
      </div>
    </div>
  );
};

export default Contacts;
