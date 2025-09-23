import { FC } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { ButtonProps } from "./types";

const Button: FC<ButtonProps> = ({
  title,
  type = "button",
  styleType = "filled",
  size = "big",
  className,
  ...props
}) => {
  const customClassName = clsx(
    styles.button,
    styles[size],
    styles[styleType],
    className
  );
  return (
    <button className={customClassName} type={type} {...props}>
      {title}
    </button>
  );
};

export default Button;
