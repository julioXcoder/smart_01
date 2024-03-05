"use client";

import React, { useState } from "react";
import moment from "moment-timezone";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createNewAcademicYear } from "@/server/actions/university";

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

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "academic year name must be at least 2 characters.",
  }),
  startTime: z.string({
    required_error: "Please select a start date.",
  }),
  endTime: z.string({
    required_error: "Please select a end date.",
  }),
});

const today = moment().tz("Africa/Dar_es_Salaam").format("YYYY-MM-DDTHH:mm");
// const today = moment().tz("Africa/Dar_es_Salaam").toDate();

const NewAcademicYearForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      startTime: today,
      endTime: today,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);

    const endTime = new Date(data.endTime);
    const startTime = new Date(data.startTime);

    console.log("Start time ....", startTime);
    console.log("End time ....", endTime);

    await createNewAcademicYear({
      name: data.name,
      startTime,
      endTime,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>name</FormLabel>
              <FormControl>
                <Input placeholder="2023-2024" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start date</FormLabel>
              <FormControl>
                <Input
                  className="w-52 appearance-none rounded border px-2 py-3 text-gray-600 shadow"
                  type="datetime-local"
                  id="meeting-time"
                  // min={minDate}
                  // max={maxDate}
                  // value={field.value.toISOString().slice(0, 16)}
                  // onChange={field.onChange}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="endTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End date</FormLabel>
              <FormControl>
                <Input
                  className="w-52 appearance-none rounded border px-2 py-3 text-gray-600 shadow"
                  type="datetime-local"
                  id="meeting-time"
                  // min={minDate}
                  // max={maxDate}
                  // value={field.value.toISOString().slice(0, 16)}
                  // onChange={field.onChange}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default NewAcademicYearForm;
