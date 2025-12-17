"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form/form";
import { FormField } from "@/components/ui/form/form-field";
import { FormItem } from "@/components/ui/form/form-item";
import { FormLabel } from "@/components/ui/form/form-label";
import { FormControl } from "@/components/ui/form/form-control";
import { FormMessage } from "@/components/ui/form/form-message";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  agree: z.boolean(),
  notifications: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

export default function BasicFormExample() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", role: "user", agree: false, notifications: true },
  });
  const { handleSubmit, control } = methods;

  const onSubmit = (data: FormValues) => {
    // For the example we just log. In a real app you'd submit to your API.
    console.log("Form submit:", data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="mb-4 text-2xl font-bold">
        Forms: Select / Checkbox / Switch example
      </h1>
      <Form methods={methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={control}
            name="name"
            render={({ field: f }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...f} placeholder="Your name" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="role"
            render={({ field: f }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select {...f}>
                    <option value="">Select role</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="agree"
            render={({ field: f }) => (
              <FormItem>
                <FormLabel>Agree to terms</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={!!f.value}
                      onChange={(e) => f.onChange(e.target.checked)}
                    />
                    <span className="text-sm text-muted-foreground">
                      I agree
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="notifications"
            render={({ field: f }) => (
              <FormItem>
                <FormLabel>Notifications</FormLabel>
                <FormControl>
                  <Switch
                    checked={!!f.value}
                    onChange={(e) => f.onChange(e.target.checked)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
