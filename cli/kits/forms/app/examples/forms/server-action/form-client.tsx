"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ServerActionForm({
  action,
}: {
  action: (formData: FormData) => Promise<void>;
}) {
  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Title</label>
        <Input name="title" placeholder="Post title" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">Content</label>
        <textarea
          name="content"
          className="h-28 w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>
      <Button type="submit">Create (server action)</Button>
    </form>
  );
}
