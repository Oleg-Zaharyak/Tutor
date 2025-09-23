import { Dispatch, SetStateAction, HTMLInputTypeAttribute } from "react";

export type InputsProps = {
  title: string;
  inputSize?: "big" | "medium" | "small";
  inputType?: HTMLInputTypeAttribute;
  containerClassName?: string;
  inputClassName?: string;
  lableClassName?: string;
  error?: boolean;
  errorText?: string;
  showPassword?: boolean;
  setShowPassword?: Dispatch<SetStateAction<boolean>>;
} & React.InputHTMLAttributes<HTMLInputElement>;
