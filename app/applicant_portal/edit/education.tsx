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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import toast from "react-hot-toast";
import { FiArrowDown, FiArrowUp, FiTrash2 } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import z from "zod";
import { FormSchema, educationLevel, years } from "./data";
import {
  addApplicantEducationBackground,
  deleteApplicantEducationBackground,
} from "@/server/actions/applicant";
import { useState } from "react";

interface Props {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
}

const maxItems = 4;

const Education = ({ form }: Props) => {
  const { fields, append, move, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleAddItem = async () => {
    if (fields.length < maxItems) {
      append({
        _id: fields.length.toString(),
        position: fields.length,
        level: "",
        schoolName: "",
        startYear: "",
        endYear: "",
      });

      setIsLoading(true);
      const { error } = await addApplicantEducationBackground(fields.length);
      setIsLoading(false);

      if (error) {
        toast.error(error, { duration: 6000 });
        remove(fields.length);
      }
    }
  };

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

  const handleDelete = async (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }

    const removeItemId = fields[index]._id;

    setIsLoading(true);
    const { error } = await deleteApplicantEducationBackground(removeItemId);
    setIsLoading(false);

    if (error) {
      toast.error(error, { duration: 6000 });
      remove(fields.length);
    }
  };

  return (
    <>
      <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">
        Share Your Academic Journey
      </h1>
      <p className="my-3 text-gray-800 dark:text-gray-400">
        Tell us about your educational background. Every step of your academic
        journey is important to us.
      </p>
      {fields.map((item, index) => (
        <Card key={item._id} className="my-3 w-full">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge className="shrink-0"># {index + 1}</Badge>
              <div className="flex items-center space-x-2">
                <Button
                  disabled={index === 0}
                  onClick={() => handleMoveUp(index)}
                  variant="outline"
                  size="icon"
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FiArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  disabled={index === fields.length - 1}
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
                        disabled={isLoading}
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
                          Confirm Item Removal
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to remove this Item?
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
              <FormField
                control={form.control}
                name={`education.${index}.level`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level of education</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select education level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {educationLevel.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`education.${index}.schoolName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Official name of school or university</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="space-y-3">
              <FormField
                control={form.control}
                name={`education.${index}.startYear`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Start Year</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your start year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year.value} value={year.value}>
                            {year.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`education.${index}.endYear`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>End Year (Graduation)</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your end year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year.value} value={year.value}>
                            {year.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="my-5 flex w-full items-center justify-center">
        <Button
          disabled={fields.length >= maxItems || isLoading}
          className="flex items-center gap-2"
          variant={"outline"}
          onClick={handleAddItem}
        >
          <MdAdd className="h-5 w-5 shrink-0" />
          Add new Education Card
        </Button>
      </div>
    </>
  );
};

export default Education;
