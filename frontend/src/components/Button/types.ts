import { IconType } from "react-icons";

export enum ButtonStyles {
  FILLED = "filled",
  OUTLINE = "outline",
  LINK = "link",
  WARNING = "warning",
  WARNING_OUTLINE = "warningOutline",
}

export type ButtonProps = {
  title?: string;
  type?: "submit" | "button" | "reset";
  collapseToIcon?: boolean;
  collapseTextToIcon?: boolean;
  showOnlyIcon?: boolean;
  showTooltip?: boolean;
  tooltipPosition?: "top" | "right" | "bottom" | "left";
  big?: boolean;
  medium?: boolean;
  small?: boolean;
  buttonStyle?: ButtonStyles;
  className?: string;
  Icon?: IconType;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
