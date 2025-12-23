"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { FormItemContext } from "./context";

export type FormItemProps = React.HTMLAttributes<HTMLDivElement>;


export const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, ...props }, ref) => {
    const id = React.useId();

    return (
      <FormItemContext.Provider value={{ id }}>
        <div ref={ref} className={cn("space-y-2", className)} {...props} />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = "FormItem";
