import { FC } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { ButtonProps } from "./types";

const Button: FC<ButtonProps> = ({
  style,
  title,
  type = "button",
  styleType = "filled",
  size = "big",
  className,
  disabled = false,
  onClick,
}) => {
  const customClassName = clsx(
    styles.button,
    styles[size],
    styles[styleType],
    className
  );
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
