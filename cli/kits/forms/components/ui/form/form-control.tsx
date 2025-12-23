"use client";

import * as React from "react";
import { useFormField } from "./context";
import { Slot } from "@radix-ui/react-slot";

export type FormControlProps = React.ComponentPropsWithoutRef<typeof Slot>;


export const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  FormControlProps
>(({ ...props }, ref) => {
  const { formItemId, formDescriptionId, formMessageId, error } =
    useFormField();
  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        error ? `${formDescriptionId} ${formMessageId}` : formDescriptionId
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";
