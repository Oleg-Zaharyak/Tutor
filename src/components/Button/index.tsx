import { FC, MouseEvent } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

type ButtonProps = {
  title?: string;
  type?: "submit" | "button" | "reset";
  styleType?: "filled" | "outline";
  style?: object;
  className: string;
  disabled?: boolean;
  onClick?(event?: MouseEvent<HTMLElement>): void;
};

const Button: FC<ButtonProps> = ({
  style,
  title,
  type = "button",
  styleType = "filled",
  className,
  disabled = false,
  onClick,
}) => {
  const customClassName = clsx(styles.button, styles[styleType], className);
  return (
    <button
      className={customClassName}
      disabled={disabled}
      type={type}
      style={style}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
