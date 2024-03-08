"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import HeadingThree from "@/components/typography/headingThree";

const documents = [
  { id: "AcceptanceLetter", label: "Acceptance Letter" },
  { id: "AcademicCertificates", label: "Academic Certificates" },
  { id: "Transcripts", label: "Transcripts" },
  { id: "BirthCertificate", label: "Birth Certificate" },
  { id: "PassportPhotos", label: "Passport Size Photographs" },
  { id: "BankSlips", label: "Bank Slips for Fees Payment" },
] as const;

const medicalCheckUp = [
  { id: "MedicalFormDownload", label: "Download Medical Examination Form" },
];

const FormSchema = z.object({
  documents: z.array(z.string()).refine((value) => value.length === 6, {
    message: "Please ensure you have selected all required documents.",
  }),
  medicalCheckUp: z.array(z.string()).refine((value) => value.length === 1, {
    message: "Please ensure you have downloaded the medical examination form.",
  }),
});

const Prepare = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <div>
      <HeadingThree>
        Prepare for your transition to MUST with these essential steps:
      </HeadingThree>
      <Form {...form}>
        <form className="mt-5 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
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
        </form>
      </Form>
    </div>
  );
};

export default Prepare;
