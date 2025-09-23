import { FC, useId } from "react";
import styles from "./styles.module.scss";
import { TextareaProps } from "./types";
import clsx from "clsx";

const Input: FC<TextareaProps> = ({
  title,
  containerClassName,
  inputClassName,
  lableClassName,
  ...props
}) => {
  const inputId = useId();

  return (
    <div className={clsx(styles.container, containerClassName)}>
      <label className={clsx(styles.lable, lableClassName)} htmlFor={inputId}>
        {title}
      </label>
      <textarea
        className={clsx(styles.textarea, inputClassName)}
        id={inputId}
        {...props}
      ></textarea>
    </div>
  );
};

export default Input;
