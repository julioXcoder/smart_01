import HeadingThree from "@/components/typography/headingThree";
import Muted from "@/components/typography/muted";
import Paragraph from "@/components/typography/paragraph";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AccommodationSchema } from "../data";
import OffCampus from "../accommodation/offCampus";

interface Props {
  form: UseFormReturn<z.infer<typeof AccommodationSchema>>;
}

const Settle = ({ form }: Props) => {
  return (
    <div>
      <HeadingThree>
        Prepare for settling into university life with these final steps:
      </HeadingThree>
      {/* <div className="mt-5 ps-5">
        <Form {...form}>
          <form className="w-2/3 space-y-6">
            <FormField
              control={form.control}
              name="accommodation"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>
                    Please select one of the following options to proceed:
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="on-campus" disabled />
                        </FormControl>
                        <div className="">
                          <FormLabel className="font-normal">
                            On-Campus
                          </FormLabel>
                          <FormDescription>
                            Enjoy campus life in our hostel, with easy access to
                            classes and facilities.
                          </FormDescription>
                        </div>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="off-campus" />
                        </FormControl>
                        <div>
                          <FormLabel className="font-normal">
                            Off-campus
                          </FormLabel>
                          <FormDescription>
                            For more independence and city exploration, consider
                            off-campus options. We can help find suitable ones.
                          </FormDescription>
                        </div>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="already-secured" />
                        </FormControl>
                        <div>
                          <FormLabel className="font-normal">
                            Already Secured Accommodation
                          </FormLabel>
                          <FormDescription>
                            If you’ve already arranged your accommodation,
                            that’s great! Please select this option.
                          </FormDescription>
                        </div>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div> */}
      <div>
        <OffCampus />
      </div>
    </div>
  );
};

export default Settle;
