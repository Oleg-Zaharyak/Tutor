import React, { FC } from "react";
import styles from "./styles.module.scss";

import { LayoutToggleProps } from "./types";

import clsx from "clsx";
import { BsGrid, BsList } from "react-icons/bs";

const layoutOptions = [
  { key: "grid" as const, icon: BsGrid },
  { key: "table" as const, icon: BsList },
];

const LayoutToggle: FC<LayoutToggleProps> = ({ value, onChange }) => {
  return (
    <div className={styles.container}>
      {layoutOptions.map(({ key, icon: Icon }) => (
        <React.Fragment key={key}>
          <button
            onClick={() => onChange(key)}
            className={clsx(
              styles.container_btn,
              value === key && styles.container_btn_active
            )}
          >
            <Icon className={styles.container_btn_icon} />
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default LayoutToggle;
