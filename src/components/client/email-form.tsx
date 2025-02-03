"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { api } from "../../trpc/react";

const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: "Email must be at least 2 characters.",
    })
    .email({ message: "Please enter a valid email." }),
});

export default function EmailForm() {
  const { data: csrfData } = api.auth.getCsrf.useQuery();
  console.log(csrfData);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // fetch("/api/auth/signin", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       "csrf-token": csrfData!.csrfToken, // Use the fetched CSRF token
    //     },
    //     credentials: "include", // Include cookies for CSRF token
    //     body: JSON.stringify({
    //       provider: "nodemailer",
    //       email: values.email,
    //       redirectTo: "/dashboard",
    //     }),
    //   })
    try {
      toast.promise(
        signIn("nodemailer", {
          email: values.email,
          redirectTo: "/dashboard",
        }),
        {
          loading: "Hang tight when we log you in...",
          success: "Verification link has been sent to your email address.",
          error:
            "Error sending you verification link... Please try again later.",
        },
      );
    } catch (error) {
      console.log("[ERROR]: ", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="m@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Enter</Button>
      </form>
    </Form>
  );
}
