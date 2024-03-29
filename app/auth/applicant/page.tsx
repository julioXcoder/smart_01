"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ExclamationTriangleIcon,
  EyeClosedIcon,
  EyeOpenIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { authorizeApplicant } from "./actions";

const FormSchema = z.object({
  username: z.string().min(1, {
    message: "Username must be at least 1 characters.",
  }),
  password: z.string().min(1, {
    message: "Password must be at least 8 characters.",
  }),
});

const Page = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [showPass, setShowPass] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const toggleShowPass = () => setShowPass(!showPass);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setErrorMessage("");

    const response = await authorizeApplicant(data);

    if (response.redirect) {
      router.push(response.redirect);
    } else if (response.message) {
      setErrorMessage(response.message);
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <div className="grid gap-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Applicant Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter Username" {...field} />
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
        {errorMessage && (
          <div className="flex items-center gap-2 text-sm text-red-500">
            <ExclamationTriangleIcon className="mt-0.5 h-4 w-4 shrink-0" />
            {errorMessage}
          </div>
        )}
        <Button
          disabled={loading}
          onClick={form.handleSubmit(onSubmit)}
          className="mt-6 w-full"
        >
          {loading ? "Signing in… Please wait." : "Sign in"}
        </Button>
      </div>
    </Form>
  );
};

export default Page;
