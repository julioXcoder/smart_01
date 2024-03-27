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
import HeadingThree from "@/components/typography/headingThree";

interface Props {
  form: UseFormReturn<z.infer<typeof FormSchema>>;
}

const Setup = ({ form }: Props) => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const toggleShowPass = () => setShowPass(!showPass);
  const toggleConfirmPass = () => setShowConfirm(!showConfirm);

  return (
    <div>
      <div className="mb-4 lg:hidden">
        <HeadingThree>Account Creation</HeadingThree>
      </div>
      <Form {...form}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="my-6 grid gap-6 md:grid-cols-2">
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
    </div>
  );
};

export default Setup;
