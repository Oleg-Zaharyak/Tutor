import {
  ChangeEvent,
  FC,
  Dispatch,
  SetStateAction,
  useId,
  FocusEvent,
} from "react";
import styles from "./styles.module.scss";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import clsx from "clsx";

type InputsProps = {
  title: string;
  name?: string;
  inputType: string;
  value?: string;
  style?: object;
  error?: boolean;
  errorText?: string;
  disabled?: boolean;
  placeholder?: string;
  showPassword?: boolean;
  setShowPassword?: Dispatch<SetStateAction<boolean>>;
  onBlure?(el?: FocusEvent<HTMLInputElement>): void;
  onChange(el?: ChangeEvent<HTMLInputElement>): void;
};

const Input: FC<InputsProps> = ({
  name,
  value,
  title,
  error,
  errorText,
  inputType,
  style,
  disabled = false,
  placeholder,
  showPassword = false,
  setShowPassword,
  onBlure,
  onChange,
}) => {
  const inputId = useId();

  return (
    <div className={styles.container} style={{ ...style }}>
      <label className={styles.lable} htmlFor={inputId}>
        {title}
      </label>
      <input
        name={name}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        className={clsx(styles.input, error && styles.input_error)}
        type={!showPassword ? inputType : "text"}
        id={inputId}
        onBlur={onBlure}
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
