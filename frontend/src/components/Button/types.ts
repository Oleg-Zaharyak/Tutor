export type ButtonProps = {
  title?: string;
  type?: "submit" | "button" | "reset";
  styleType?: "filled" | "outline" | "warning";
  size?: "big" | "medium" | "small";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
