"use client";

import { Checkbox } from "@/components/ui/checkbox";
import CongratsCard from "./CongratsCard";
import { Path } from "@/types";
import { useState } from "react";
import {
  FaInbox,
  FaCreditCard,
  FaGear,
  FaMagnifyingGlass,
} from "react-icons/fa6";
import { MdChecklist } from "react-icons/md";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const FormSchema = z.object({
  check: z.boolean().refine((value) => value === true, {
    message:
      "You must agree to abide by the University regulations and by-laws.",
  }),
});

const RulesCard = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [displayRules, setDisplayRules] = useState(false);

  const handleDisplayRules = () => {
    setDisplayRules(true);
  };

  const rules = [
    {
      title: "Examination Regulations",
      content:
        "Abide by the rules governing examinations set forth by the University.",
    },
    {
      title: "Student Conduct and Discipline",
      content:
        "Maintain proper conduct and discipline in all academic and non-academic activities.",
    },
    {
      title: "Industrial Training Regulations",
      content:
        "Comply with regulations pertaining to industrial training programs.",
    },
    {
      title: "Use of Facilities",
      content:
        "Adhere to regulations governing the use of University facilities, including laboratories, workshops, classes, sports facilities, hostels, and the dispensary.",
    },
  ];

  const additionalRules = [
    {
      title: "Admission Criteria",
      content:
        "Adhere to admission criteria based on good behavior and academic record.",
    },
    {
      title: "Compliance with Laws",
      content: "Obey the laws of the United Republic of Tanzania at all times.",
    },
    {
      title: "Political Neutrality",
      content:
        "Refrain from engaging in activities against the government or its agents.",
    },
    {
      title: "Demonstrations",
      content:
        "Obtain lawful permits before organizing or participating in demonstrations. Vandalism or destruction of property is strictly prohibited.",
    },
    {
      title: "University By-Laws",
      content:
        "Abide by all University by-laws and regulations issued by relevant authorities.",
    },
    {
      title: "Diligence in Studies",
      content:
        "Dedicate yourself diligently to your studies until the completion of your course program.",
    },
    {
      title: "Attendance and Progress",
      content:
        "Maintain satisfactory attendance, conduct, and academic progress as required by the University.",
    },
    {
      title: "Criminal Offences",
      content:
        "Conviction of any criminal offence will result in expulsion from the University.",
    },
    {
      title: "Financial Responsibility",
      content:
        "Arrange for financing of your studies through the Higher Students’ Loans Board or a sponsor. The University is not responsible for student financial matters.",
    },
  ];

  const dressCodeRules = [
    {
      title: "Professional Appearance",
      content:
        "Dress in a manner that reflects professionalism and respect for the academic environment.",
    },
    {
      title: "Neat and Tidy Attire",
      content:
        "Wear clean and well-maintained clothing that is appropriate for an educational setting.",
    },
    {
      title: "Respectful Attire",
      content:
        "Avoid clothing that is offensive, revealing, or disrespectful to others.",
    },
    {
      title: "Safety Considerations",
      content:
        "Ensure that your attire does not pose any safety hazards or impediments to participation in academic activities.",
    },
    {
      title: "Special Events",
      content:
        "Dress appropriately for special events, such as presentations, ceremonies, or official functions, as specified by the University.",
    },
  ];

  return (
    <div className="mx-auto mt-20 w-full max-w-[45rem]">
      {displayRules ? (
        <Card>
          <CardHeader className="flex items-center">
            <CardTitle>University Regulations and By-Laws</CardTitle>
            <CardDescription>
              As a student of this University, you are expected to adhere to the
              following regulations and by-laws:
            </CardDescription>
          </CardHeader>
          <CardContent className="max-h-72 overflow-y-auto">
            <Accordion type="single" collapsible className="w-full">
              {rules.map((item, index) => (
                <AccordionItem value={item.title} key={index}>
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
              ))}
              <div className="mb-2 mt-6">
                <CardTitle>Additional Conditions</CardTitle>
                <CardDescription>
                  In addition to the above regulations, students must observe
                  the following conditions:
                </CardDescription>
              </div>
              {additionalRules.map((item, index) => (
                <AccordionItem value={item.title} key={index}>
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
              ))}
              <div className="mb-2 mt-6">
                <CardTitle>Student Dress Code Policy</CardTitle>
                <CardDescription>
                  As a student of this University, it is important to adhere to
                  the following dress code policy:
                </CardDescription>
              </div>
              {dressCodeRules.map((item, index) => (
                <AccordionItem value={item.title} key={index}>
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
          <CardContent className="mt-6 flex justify-end">
            <Form {...form}>
              <form>
                <FormField
                  control={form.control}
                  name="check"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I have read and agree to abide by the University
                          regulations and by-laws
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button onClick={() => setDisplayRules(false)} variant="outline">
              Cancel
            </Button>
            <Button className="w-44">Continue</Button>
          </CardFooter>
        </Card>
      ) : (
        <CongratsCard displayRules={handleDisplayRules} />
      )}
    </div>
  );
};

export default RulesCard;
