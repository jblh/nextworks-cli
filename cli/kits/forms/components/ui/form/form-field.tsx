"use client";

import * as React from "react";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";
import { FormFieldContext } from "./context";

export interface FormFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  render: ControllerProps<TFieldValues, TName>["render"];
}

export function FormField<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(props: FormFieldProps<TFieldValues, TName>) {
  const { name, control, rules, shouldUnregister, render } = props;

  return (
    <FormFieldContext.Provider value={{ name: name as string }}>
      <Controller
        name={name}
        control={control}
        rules={rules}
        shouldUnregister={shouldUnregister}
        render={render}
      />
    </FormFieldContext.Provider>
  );
}
