import { FC, useId } from "react";
import styles from "./styles.module.scss";
import clsx from "clsx";
import { CheckboxProps } from "./types";

const Checkbox: FC<CheckboxProps> = ({ title, error = false, ...props }) => {
  const inputId = useId();
  return (
    <div className={styles.checkbox_wrapper_4}>
      <input
        className={styles.inp_cbx}
        id={inputId}
        type="checkbox"
        {...props}
      />
      <label className={styles.cbx} htmlFor={inputId}>
        <span>
          <svg width="12px" height="10px">
            s<use xlinkHref="#check-4"></use>
          </svg>
        </span>
        <span className={clsx(error && styles.error)}>{title}</span>
      </label>
      <svg className={styles.inline_svg}>
        <symbol id="check-4" viewBox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </symbol>
      </svg>
    </div>
  );
};

export default Checkbox;
