import { FC } from "react";
import styles from "./styles.module.scss";
import Button from "../Button";
import { ConfirmModalProps } from "./types";

import clsx from "clsx";
import { ButtonStyles } from "../Button/types";

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
            onClick={onClose}
            className={styles.btn}
            buttonStyle={ButtonStyles.OUTLINE}
            big
          />
          {showTwoButton && (
            <Button
              title={confirmText}
              onClick={onConfirm}
              className={styles.btn}
              buttonStyle={ButtonStyles.OUTLINE}
              big
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
