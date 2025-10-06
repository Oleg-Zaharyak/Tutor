import { FC, useId } from "react";
import styles from "./styles.module.scss";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import clsx from "clsx";
import { InputsProps } from "./types";
import { useMask } from "@react-input/mask";
import { telInputMask } from "../../constants/variables";

const Input: FC<InputsProps> = ({
  inputSize = "big",
  title,
  error,
  errorText,
  inputType = "text",
  containerClassName,
  inputClassName,
  lableClassName,
  showPassword = false,
  setShowPassword,
  ...props
}) => {
  const inputId = useId();

  const inputRef = useMask({
    mask: telInputMask,
    replacement: { _: /\d/ },
  });

  return (
    <div className={clsx(styles.container, containerClassName)}>
      <label
        className={clsx(
          styles.lable,
          styles[`${inputSize}_label`],
          lableClassName
        )}
        htmlFor={inputId}
      >
        {title}
      </label>
      <input
        className={clsx(
          styles.input,
          styles[`${inputSize}_input`],
          error && styles.input_error,
          inputClassName
        )}
        {...(inputType === "tel" ? { ref: inputRef } : {})}
        type={!showPassword ? inputType : "text"}
        id={inputId}
        {...props}
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
