import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { FaUniversity } from "react-icons/fa";
import { FiArrowDown, FiArrowUp, FiTrash2 } from "react-icons/fi";
import { IoWarning } from "react-icons/io5";
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
import { UseFormReturn } from "react-hook-form";
import { FormSchema } from "./data";
import { IoCalendarOutline } from "react-icons/io5";
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
import z from "zod";
import { getYear, format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, useFieldArray, FieldError } from "react-hook-form";

interface Props {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
}

const years = Array.from(
  { length: new Date().getFullYear() - 1899 },
  (_, i) => {
    const year = i + 1900;
    return { value: year.toString(), label: year.toString() };
  },
);

const Education = ({ form }: Props) => {
  const { fields, append, move, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const handleMoveUp = (index: number) => {
    if (index > 0) {
      move(index, index - 1);
    }
  };

  const handleMoveDown = (index: number) => {
    if (index < fields.length - 1) {
      move(index, index + 1);
    }
  };

  const handleDelete = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const handleAddItem = () => {
    append({
      level: "",
      schoolName: "",
      startYear: "",
      endYear: "",
    });
  };

  return (
    <>
      {fields.map((item, index) => (
        <Card key={item.id} className="my-3 w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge className="shrink-0"># {index + 1}</Badge>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => handleMoveUp(index)}
                  variant="outline"
                  size="icon"
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FiArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleMoveDown(index)}
                  variant="outline"
                  size="icon"
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FiArrowDown className="h-4 w-4" />
                </Button>
                {fields.length > 1 && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-red-500 hover:bg-red-600 hover:text-white "
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Confirm Priority Removal
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to remove{" "}
                          <span className="text-orange-500 underline underline-offset-2">
                            {item.schoolName}
                          </span>{" "}
                          from your priorities?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>No, Keep It</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-500 hover:bg-red-700"
                          onClick={() => handleDelete(index)}
                        >
                          Yes, Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <Input
                {...form.register(`education.${index}.level`)}
                defaultValue={item.level}
              />
              {form.formState.errors.education && (
                <p className="text-red-500">
                  {form.formState.errors.education[index]?.level?.message}
                </p>
              )}

              <Input
                {...form.register(`education.${index}.schoolName`)}
                defaultValue={item.schoolName}
              />
              {form.formState.errors.education && (
                <p className="text-red-500">
                  {form.formState.errors.education[index]?.schoolName?.message}
                </p>
              )}
            </div>
            <div className="space-y-3">
              <Input
                {...form.register(`education.${index}.startYear`)}
                defaultValue={item.startYear}
              />
              {form.formState.errors.education && (
                <p className="text-red-500">
                  {form.formState.errors.education[index]?.startYear?.message}
                </p>
              )}

              <Input
                {...form.register(`education.${index}.endYear`)}
                defaultValue={item.endYear}
              />
              {form.formState.errors.education && (
                <p className="text-red-500">
                  {form.formState.errors.education[index]?.endYear?.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="my-5">
        <Button onClick={handleAddItem}>Add Card</Button>
      </div>
    </>
  );
};

export default Education;
