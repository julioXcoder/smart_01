"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { UseFormReturn } from "react-hook-form";
import z from "zod";
import { FormSchema } from "./data";
import { Form } from "@/components/ui/form";

import { FaPaperPlane } from "react-icons/fa6";
import { MdOutlineAccessTime } from "react-icons/md";
import DraftTabs from "./draftTabs";
import { Tab } from "@/types";

import { ApplicationDetails } from "@/types/application";

interface Props {
  tabs: Tab[];
  form: UseFormReturn<z.infer<typeof FormSchema>>;
  // onDraftSave: ({
  //   successText,
  //   errorText,
  //   loadingText,
  // }: {
  //   successText?: string;
  //   errorText?: string;
  //   loadingText?: string;
  // }) => Promise<void>;
  // onApplicationSubmit: () => Promise<void>;
}

const Draft = ({ tabs, form }: Props) => {
  return (
    <div className="w-full">
      <Form {...form}>
        <DraftTabs tabs={tabs} />
      </Form>
    </div>
  );
};

export default Draft;
