import { FC } from "react";
import styles from "./styles.module.scss";
import Button from "../Button";
import { ConfirmModalProps } from "./types";

import clsx from "clsx";
import { ButtonStyles } from "../Button/types";
import { useTranslation } from "react-i18next";

const ConfirmModal: FC<ConfirmModalProps> = ({
  onClose,
  onConfirm,
  title,
  cancelText,
  confirmText,
  showTwoButton = true,
  className,
}) => {
  const { t } = useTranslation("common");

  const newtitle = title || t("buttons-title.delete-modal-title");
  const newConfirmText = confirmText || t("buttons-title.confirm-delete-btn");
  const newCancelText = cancelText || t("buttons-title.cancel-delete-btn");

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={clsx(styles.modal, className)}
        onClick={(e) => e.stopPropagation()}
      >
        <p className={styles.text}>{newtitle}</p>
        <div className={styles.buttons}>
          {showTwoButton && (
            <Button
              title={newConfirmText}
              onClick={onConfirm}
              className={styles.btn}
              buttonStyle={ButtonStyles.WARNING_OUTLINE}
              medium
            />
          )}
          <Button
            title={newCancelText}
            onClick={onClose}
            className={styles.btn}
            buttonStyle={ButtonStyles.OUTLINE}
            medium
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
