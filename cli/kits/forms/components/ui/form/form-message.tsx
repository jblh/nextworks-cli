"use client";

import * as React from "react";
import { useFormField } from "./context";
import { cn } from "@/lib/utils";

export interface FormMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FormMessage = ({
  className,
  children,
  ...props
}: FormMessageProps) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error.message || children) : children;

  if (!body) return null;

  return (
    <p
      id={formMessageId}
      className={cn("text-xs text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
};
