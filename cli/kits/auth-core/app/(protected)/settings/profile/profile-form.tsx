"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/lib/validation/forms";
import { Form } from "@/components/ui/form/form";
import { FormField } from "@/components/ui/form/form-field";
import { FormItem } from "@/components/ui/form/form-item";
import { FormLabel } from "@/components/ui/form/form-label";
import { FormControl } from "@/components/ui/form/form-control";
import { FormMessage } from "@/components/ui/form/form-message";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { mapApiErrorsToForm } from "@/lib/forms/map-errors";
import { toast } from "sonner";

export default function ProfileForm() {
  const { data: session, update } = useSession();

  const methods = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: { name: "", email: "" },
  });
  const { control, handleSubmit, reset } = methods;
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (session?.user) {
      reset({ name: session.user.name ?? "", email: session.user.email ?? "" });
    }
  }, [session, reset]);

  const onSubmit = async (values: any) => {
    if (!session?.user?.id) {
      toast.error("You must be signed in to update your profile");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch(`/api/users/${session.user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = await res.json();

      const globalMessage = mapApiErrorsToForm(methods, payload);

      if (payload?.success) {
        toast.success(payload.message ?? "Profile updated");
        // update local form values to reflect saved state
        reset(values);
        // Patch the NextAuth session so UI reflects the change immediately
        await update({ name: values.name, email: values.email });
      } else {
        if (globalMessage) {
          toast.error(globalMessage);
        } else {
          toast.error(payload?.message ?? "Failed to update profile");
        }
      }
    } catch (e) {
      console.error("Failed to update profile", e);
      toast.error("Network error while updating profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-card rounded-md p-6">
      <h2 className="mb-3 text-lg font-semibold">Profile settings</h2>
      <Form methods={methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSaving}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
