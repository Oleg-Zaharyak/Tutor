import { FC, MouseEvent } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";

type ButtonProps = {
  title?: string;
  type?: "submit" | "button" | "reset";
  styleType?: "filled" | "outline";
  style?: object;
  disabled?: boolean;
  onClick?(event?: MouseEvent<HTMLElement>): void;
};

const Button: FC<ButtonProps> = ({
  style,
  title,
  type = "button",
  styleType = "filled",
  disabled = false,
  onClick,
}) => {
  return (
    <button
      className={clsx(styles.button, styles[styleType])}
      disabled={disabled}
      type={type}
      style={{ ...style }}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
