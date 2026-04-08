import React, { FC } from "react";
import styles from "./styles.module.scss";

import { LayoutToggleProps } from "./types";

import clsx from "clsx";
import { Icons } from "../../constants/icons";

const layoutOptions = [
  { key: "grid" as const, icon: Icons.grid },
  { key: "table" as const, icon: Icons.list },
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
              value === key && styles.container_btn_active,
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
