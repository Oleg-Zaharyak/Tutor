import { IconType } from "react-icons";

export type MenuButtonProps = {
  title: string;
  type?: "nav" | "link";
  showTooltip?: boolean;
  url: string;
  Icon?: IconType;
  expandMenu?: boolean;
  className?: string;
};
