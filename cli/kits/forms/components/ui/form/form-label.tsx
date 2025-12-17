"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { useFormField } from "./context";
import { cn } from "@/lib/utils";

export interface FormLabelProps extends React.ComponentProps<typeof Label> {}

export const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  FormLabelProps
>(({ className, ...props }, ref) => {
  const { formItemId } = useFormField();
  return (
    <Label
      ref={ref}
      htmlFor={formItemId}
      className={cn(className)}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";
