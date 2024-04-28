"use client";

import HeadingThree from "@/components/typography/headingThree";
import Muted from "@/components/typography/muted";
import { UseFormReturn } from "react-hook-form";
import { FaStarOfLife } from "react-icons/fa6";
import { z } from "zod";
import { Label } from "@/components/ui/label";
import { DocumentsSchema } from "../data";
import FileCard from "@/components/fileCard";
import AddFileCard from "@/components/addFileCard";

interface Props {
  form: UseFormReturn<z.infer<typeof DocumentsSchema>>;
}

const Prepare = ({ form }: Props) => {
  return (
    <div>
      <HeadingThree>
        Prepare for your transition to MUST with these essential steps:
      </HeadingThree>
      <Muted>
        Before proceeding with the registration process, it is crucial that you
        verify the presence of all necessary documents. These documents play a
        significant role in the registration process and are required on the day
        of your arrival at the university. Please ensure you have all of them
        and check off each one to confirm its presence before continuing. Your
        careful attention to this matter is greatly appreciated.
      </Muted>
      {/* <div className="mt-5 ps-5">
        <Form {...form}>
          <div className="my-5 space-y-6">
            <FormField
              control={form.control}
              name="documents"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">
                      📋 Gather Original Documents:
                    </FormLabel>
                    <FormDescription>
                      Required for enrollment process.
                    </FormDescription>
                  </div>
                  {documents.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="documents"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...(field.value || []),
                                        item.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.label}
                              <FormDescription>
                                {item.description}
                              </FormDescription>
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="medicalCheckUp"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">
                      ⚕️ Medical Check-Up:
                    </FormLabel>
                    <FormDescription>
                      Ensure pre-arrival health examination.
                    </FormDescription>
                  </div>
                  {medicalCheckUp.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="medicalCheckUp"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...(field.value || []),
                                        item.id,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.label}
                              <FormDescription>
                                Please click{" "}
                                <Link
                                  href="#"
                                  className="inline-flex items-center gap-x-1 text-sm font-medium text-blue-600 decoration-2 hover:underline dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                                >
                                  [here]
                                </Link>{" "}
                                to download the Medical Examination Form.
                                Remember to fill it out completely and bring it
                                with you when you arrive at the university.
                              </FormDescription>
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </div> */}

      <div className="mt-5 lg:ps-5">
        <div className="my-5 space-y-6">
          <div>
            <Label>Birth certificate</Label>
            <FileCard />
          </div>
          <div>
            <Label>Form IV certificate</Label>
            <AddFileCard />
          </div>
          <div>
            <Label>Other files</Label>
            <AddFileCard />
          </div>
        </div>
      </div>
      <Muted>
        <span className="flex">
          <FaStarOfLife className="mr-1 mt-0.5 size-2 shrink-0 text-red-400" />
          Please ensure you have all the necessary documents at hand. Check the
          boxes corresponding to each document once you’ve verified its
          presence.
        </span>
      </Muted>
    </div>
  );
};

export default Prepare;
