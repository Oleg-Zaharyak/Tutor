import { ChangeEvent, Dispatch, SetStateAction, FocusEvent, HTMLInputTypeAttribute } from "react";

export type InputsProps = {
  title: string;
  name?: string;
  size?: "big" | "medium" | "small";
  inputType?: HTMLInputTypeAttribute;
  value?: string;
  containerClassName?: string;
  inputClassName?: string;
  lableClassName?: string;
  error?: boolean;
  errorText?: string;
  disabled?: boolean;
  placeholder?: string;
  showPassword?: boolean;
  setShowPassword?: Dispatch<SetStateAction<boolean>>;
  onBlur?(e?: FocusEvent<HTMLInputElement>): void;
  onChange(e?: ChangeEvent<HTMLInputElement>): void;
};
