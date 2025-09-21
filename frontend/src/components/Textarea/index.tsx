import { FC, useId } from "react";
import styles from "./styles.module.scss";
import { TextareaProps } from "./types";
import clsx from "clsx";

const Input: FC<TextareaProps> = ({
  name,
  value,
  title,
  containerClassName,
  inputClassName,
  lableClassName,
  disabled = false,
  placeholder,
  onBlur,
  onChange,
}) => {
  const inputId = useId();

  return (
    <div className={clsx(styles.container, containerClassName)}>
      <label className={clsx(styles.lable, lableClassName)} htmlFor={inputId}>
        {title}
      </label>
      <textarea
        name={name}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className={clsx(styles.textarea, inputClassName)}
        id={inputId}
        onBlur={onBlur}
        onChange={onChange}
      ></textarea>
    </div>
  );
};

export default Input;
