import { ChangeEvent } from "react";

export type CheckboxProps = {
  title: string;
  name: string;
  value?: string;
  error?: boolean;
  onChange(el?: ChangeEvent<HTMLInputElement>): void;
};
