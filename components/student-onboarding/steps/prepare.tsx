"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaExclamation } from "react-icons/fa6";
import { FaStarOfLife } from "react-icons/fa6";

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
import Muted from "@/components/typography/muted";

const documents = [
  {
    id: "AcceptanceLetter",
    label: "Acceptance Letter",
    description:
      "The official document issued by the university confirming your acceptance for admission. It outlines essential details regarding your enrollment, program of study, and other pertinent information.",
  },
  {
    id: "AcademicCertificates",
    label: "Academic Certificates",
    description:
      "These are certificates or diplomas obtained from previous educational institutions, such as high school or secondary school. They validate your academic achievements and qualifications.",
  },
  {
    id: "Transcripts",
    label: "Transcripts",
    description:
      "Official transcripts contain a record of your academic performance, including grades and courses completed, from previous educational institutions. They provide a comprehensive overview of your academic history.",
  },
  {
    id: "BirthCertificate",
    label: "Birth Certificate",
    description:
      " A legal document issued by a government authority that certifies your date and place of birth. It serves as proof of identity and is often required for various administrative purposes, including enrollment in educational institutions.",
  },
  {
    id: "PassportPhotos",
    label: "Passport Size Photographs",
    description:
      "Small-sized photographs typically used for official identification purposes, such as student IDs, passports, and other official documents. They should meet specific size and quality requirements as per the institution's guidelines.",
  },
  {
    id: "BankSlips",
    label: "Bank Slips for Fees Payment",
    description:
      "Bank slips or receipts confirming payment of tuition fees and other associated expenses. They serve as proof of payment and are necessary for completing the financial aspect of the enrollment process.",
  },
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
      <Muted>
        Kindly ensure you have all necessary documents and bring them to the
        university.
      </Muted>
      <div className="mt-5 ps-5">
        <Form {...form}>
          <form
            className="my-5 space-y-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
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
                                This form is essential for completing a
                                pre-arrival medical examination. It typically
                                includes details about required medical tests,
                                vaccinations, and health history information.
                                Completing this form ensures that you meet the
                                university&rsquo;s health requirements and are
                                prepared for any health-related aspects of your
                                enrollment.
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
            {/* <Button type="submit">Submit</Button> */}
          </form>
        </Form>
      </div>
      <Muted>
        <span className="flex">
          <FaStarOfLife className="mr-1 mt-0.5 size-2 shrink-0 text-red-400" />
          Remember to check the boxes once you&rsquo;ve completed each task.
        </span>
      </Muted>
    </div>
  );
};

export default Prepare;
