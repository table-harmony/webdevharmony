"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";

import { updatePasswordAction } from "./actions";
import { updatePasswordSchema as schema } from "./validation";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { LoaderButton } from "@/components/ui/button";

export const UpdatePasswordForm = () => {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
    },
  });

  const { execute, status } = useAction(updatePasswordAction, {
    onSuccess() {
      form.reset();
      toast({
        variant: "success",
        description: "Password successfully updated!",
      });
    },
    onError(error) {
      toast({ variant: "destructive", description: error.serverError });
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(execute)}
        className="flex items-center space-x-2"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  disabled={status === "executing"}
                  placeholder="******"
                  type="password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoaderButton isLoading={status === "executing"} type="submit">
          Save
        </LoaderButton>
      </form>
    </Form>
  );
};
