"use client";

import * as React from "react";
import { useFormField } from "./context";
import { cn } from "@/lib/utils";

export type FormDescriptionProps =
  React.HTMLAttributes<HTMLParagraphElement>;


export const FormDescription = ({
  className,
  ...props
}: FormDescriptionProps) => {
  const { formDescriptionId } = useFormField();
  return (
    <p
      id={formDescriptionId}
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  );
};
