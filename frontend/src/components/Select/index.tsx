import { FC, useId } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { SelectProps } from "./types";

const Select: FC<SelectProps> = ({
  name,
  title,
  error,
  errorText,
  options,
  style,
  defaultOptionTitle,
  onChange,
}) => {
  const selectId = useId();
  return (
    <div className={styles.container} style={{ ...style }}>
      <label className={styles.lable} htmlFor={selectId}>
        {title}
      </label>
      <select
        onChange={onChange}
        name={name}
        className={clsx(styles.select, error && styles.select_error)}
        id={selectId}
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
