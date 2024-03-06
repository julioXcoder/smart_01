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
  onDraftSave: ({
    successText,
    errorText,
    loadingText,
  }: {
    successText?: string;
    errorText?: string;
    loadingText?: string;
  }) => Promise<void>;
  onApplicationSubmit: () => Promise<void>;
  draftSaving: boolean;
  isSubmitting: boolean;
  data: ApplicationDetails;
}

const Draft = ({
  tabs,
  form,
  draftSaving,
  isSubmitting,
  onDraftSave,
  onApplicationSubmit,
  data,
}: Props) => {
  return (
    <div className="w-full">
      <Form {...form}>
        <DraftTabs tabs={tabs} />
      </Form>

      <div className="w-full">
        <Button
          className="mt-2 w-full"
          variant="secondary"
          onClick={() => onDraftSave({})}
          disabled={isSubmitting || draftSaving}
        >
          <span className="flex items-center gap-2">
            <MdOutlineAccessTime className="h-4 w-4 shrink-0" />
            Save as Draft
          </span>
        </Button>

        {data.applicantControlNumber.status === "SUCCESS" && (
          <AlertDialog>
            <AlertDialogTrigger disabled={isSubmitting || draftSaving} asChild>
              <Button className="mt-2 w-full">
                <span className="flex items-center gap-2">
                  <FaPaperPlane className="h-4 w-4 shrink-0" />
                  Submit Application
                </span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Application Submission Confirmation
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Please review your information carefully before submitting.
                  Are you sure all the information is correct?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Review Again</AlertDialogCancel>
                <AlertDialogAction onClick={onApplicationSubmit}>
                  Confirm and Submit
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
};

export default Draft;
