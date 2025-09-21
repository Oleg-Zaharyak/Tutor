import { FC, useId } from "react";
import styles from "./styles.module.scss";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import clsx from "clsx";
import { InputsProps } from "./types";

const Input: FC<InputsProps> = ({
  name,
  value,
  size = "big",
  title,
  error,
  errorText,
  inputType = "text",
  containerClassName,
  inputClassName,
  lableClassName,
  disabled = false,
  placeholder,
  showPassword = false,
  setShowPassword,
  onBlur,
  onChange,
}) => {
  const inputId = useId();

  return (
    <div className={clsx(styles.container, containerClassName)}>
      <label
        className={clsx(styles.lable, styles[`${size}_label`], lableClassName)}
        htmlFor={inputId}
      >
        {title}
      </label>
      <input
        name={name}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className={clsx(
          styles.input,
          styles[`${size}_input`],
          error && styles.input_error,
          inputClassName
        )}
        type={!showPassword ? inputType : "text"}
        id={inputId}
        onBlur={onBlur}
        onChange={onChange}
      />
      {inputType === "password" ? (
        showPassword ? (
          <IoMdEye
            className={styles.eyeIcon}
            onClick={() => setShowPassword && setShowPassword(!showPassword)}
          />
        ) : (
          <IoMdEyeOff
            className={styles.eyeIcon}
            onClick={() => setShowPassword && setShowPassword(!showPassword)}
          />
        )
      ) : null}
      {error ? <div className={styles.error_container}>{errorText}</div> : null}
    </div>
  );
};

export default Input;
