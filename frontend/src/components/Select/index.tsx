import { FC, useId } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { SelectProps } from "./types";

const Select: FC<SelectProps> = ({
  title,
  error,
  errorText,
  options,
  containerStyle,
  defaultOptionTitle,
  ...props
}) => {
  const selectId = useId();
  return (
    <div className={styles.container} style={{ ...containerStyle }}>
      <label className={styles.lable} htmlFor={selectId}>
        {title}
      </label>
      <select
        className={clsx(styles.select, error && styles.select_error)}
        id={selectId}
        {...props}
      >
        {defaultOptionTitle && <option value="">{defaultOptionTitle}</option>}
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.title}
          </option>
        ))}
      </select>
      {error ? <div className={styles.error_container}>{errorText}</div> : null}
    </div>
  );
};

export default Select;
