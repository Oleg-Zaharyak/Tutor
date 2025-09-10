import { FC } from "react";
import styles from "./styles.module.scss";
import Button from "../Button";
import { ConfirmModalProps } from "./types";

import clsx from "clsx";

const ConfirmModal: FC<ConfirmModalProps> = ({
  onClose,
  onConfirm,
  title,
  cancelText = "No",
  confirmText = "Yes",
  showTwoButton = true,
  className,
}) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={clsx(styles.modal, className)}
        onClick={(e) => e.stopPropagation()}
      >
        <p className={styles.text}>{title}</p>
        <div className={styles.buttons}>
          <Button
            title={cancelText}
            styleType="outline"
            onClick={onClose}
            className={styles.btn}
          />
          {showTwoButton && (
            <Button
              title={confirmText}
              styleType="outline"
              onClick={onConfirm}
              className={styles.btn}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
