import { ChangeEvent, FocusEvent } from "react";

export type TextareaProps = {
  title: string;
  name?: string;
  value?: string;
  containerClassName?: string;
  inputClassName?: string;
  lableClassName?: string;
  disabled?: boolean;
  placeholder?: string;
  onBlur?(e?: FocusEvent<HTMLTextAreaElement>): void;
  onChange(e?: ChangeEvent<HTMLTextAreaElement>): void;
};
