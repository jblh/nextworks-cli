"use client";

import * as React from "react";
import {
  FormProvider,
  type UseFormReturn,
  type FieldValues,
} from "react-hook-form";

export interface FormProps<TFieldValues extends FieldValues = FieldValues> {
  children: React.ReactNode;
  className?: string;
  methods: UseFormReturn<TFieldValues>;
}

export function Form<TFieldValues extends FieldValues = FieldValues>({
  children,
  className,
  methods,
}: FormProps<TFieldValues>) {
  return (
    <FormProvider<TFieldValues> {...methods}>
      <div className={className}>{children}</div>
    </FormProvider>
  );
}
