import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import React from "react";
import z from "zod";
import { FormSchema } from "./data";

interface Props {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
}

const Setup = ({ form }: Props) => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const toggleShowPass = () => setShowPass(!showPass);
  const toggleConfirmPass = () => setShowConfirm(!showConfirm);

  return (
    <Form {...form}>
      <div className="my-6 grid gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="middleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Middle Name</FormLabel>
              <FormControl>
                <Input placeholder="Middle Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    className="pr-10"
                    type={showPass ? "text" : "password"}
                    placeholder="Enter Password"
                    {...field}
                  />
                  <button
                    className="absolute end-0 top-0 mx-4 h-full dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    onClick={toggleShowPass}
                  >
                    {showPass ? (
                      <EyeOpenIcon className="h-4 w-4 flex-shrink-0 text-gray-400 dark:text-neutral-600" />
                    ) : (
                      <EyeClosedIcon className="h-4 w-4 flex-shrink-0 text-gray-400 dark:text-neutral-600" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    className="pr-10"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirm Password"
                    {...field}
                  />
                  <button
                    className="absolute end-0 top-0 mx-4 h-full dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
                    onClick={toggleConfirmPass}
                  >
                    {showConfirm ? (
                      <EyeOpenIcon className="h-4 w-4 flex-shrink-0 text-gray-400 dark:text-neutral-600" />
                    ) : (
                      <EyeClosedIcon className="h-4 w-4 flex-shrink-0 text-gray-400 dark:text-neutral-600" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
};

export default Setup;
