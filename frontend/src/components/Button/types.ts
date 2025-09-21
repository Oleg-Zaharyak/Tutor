import { MouseEvent } from "react";

export type ButtonProps = {
  title?: string;
  type?: "submit" | "button" | "reset";
  styleType?: "filled" | "outline" | "warning";
  size?: "big" | "medium" | "small";
  style?: object;
  className?: string;
  disabled?: boolean;
  onClick?(event?: MouseEvent<HTMLElement>): void;
};
