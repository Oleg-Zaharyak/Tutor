import { ChangeEvent, Dispatch, SetStateAction, FocusEvent } from "react";

export type InputsProps = {
  title: string;
  name?: string;
  inputType: string;
  value?: string;
  style?: object;
  error?: boolean;
  errorText?: string;
  disabled?: boolean;
  placeholder?: string;
  showPassword?: boolean;
  setShowPassword?: Dispatch<SetStateAction<boolean>>;
  onBlure?(e?: FocusEvent<HTMLInputElement>): void;
  onChange(e?: ChangeEvent<HTMLInputElement>): void;
};
