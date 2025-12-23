"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema } from "@/lib/validation/forms";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form/form";
import { FormField } from "@/components/ui/form/form-field";
import { FormItem } from "@/components/ui/form/form-item";
import { FormLabel } from "@/components/ui/form/form-label";
import { FormControl } from "@/components/ui/form/form-control";
import { FormMessage } from "@/components/ui/form/form-message";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { mapApiErrorsToForm } from "@/lib/forms/map-errors";
import { toast } from "sonner";

import { useSession } from "next-auth/react";

export default function CreatePostForm() {
  // Relax the schema for this demo form: authorId is optional here
  const postFormSchema = postSchema.extend({
    authorId: postSchema.shape.authorId.optional().or(z.literal("")),
  });

  const methods = useForm({
    resolver: zodResolver(postFormSchema),
    defaultValues: { title: "", content: "" },
  });
  const { control, handleSubmit, reset } = methods;

  const session = useSession();
  const router = useRouter();

  type CreatePostFormValues = z.infer<typeof postFormSchema>;

  const onSubmit = async (values: CreatePostFormValues) => {
    if (session.status !== "authenticated") {
      toast.error(
        "You must be signed in to create a post. Use the Sign up / Log in links above.",
      );
      return;
    }
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const payload = await res.json().catch(() => null);
      if (!res.ok || !payload?.success) {
        const msg = payload ? mapApiErrorsToForm(methods, payload) : undefined;
        toast.error(msg || payload?.message || "Create failed");
        return;
      }
      reset();
      toast.success("Post created");
      // Refresh the server-rendered list below
      router.refresh();
    } catch {
      toast.error("Create failed");
    }
  };

  return (
    <div className="bg-card rounded-md p-6">
      <h3 className="mb-3 text-lg font-semibold">
        Create a post (requires sign in)
      </h3>
      <Form methods={methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea {...field} rows={4} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Create Post</Button>
        </form>
      </Form>
    </div>
  );
}
