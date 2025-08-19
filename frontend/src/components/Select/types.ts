import { ChangeEvent } from "react";


export type SelectProps = {
  name: string;
  title: string;
  options: { title: string; value: string }[];
  style?: object;
  error?: boolean;
  errorText?: string;
  onChange(e?: ChangeEvent<HTMLSelectElement>): void;
  defaultOptionTitle?: string;
};