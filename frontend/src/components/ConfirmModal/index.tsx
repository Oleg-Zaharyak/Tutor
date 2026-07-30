import { FC } from "react";
import styles from "./styles.module.scss";
import Button from "../Button";
import { ConfirmModalProps } from "./types";

import clsx from "clsx";
import { ButtonStyles } from "../Button/types";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom"; // Імпортуємо портал

const sizeMap = {
  small: { small: true },
  medium: { medium: true },
  big: { big: true },
} as const;

// Розширюємо ваші пропси новим селектором контейнера
interface ExtendedConfirmModalProps extends ConfirmModalProps {
  containerSelector?: string; // наприклад, ".profile_modal_wrapper"
}

const ConfirmModal: FC<ExtendedConfirmModalProps> = ({
  onClose,
  onConfirm,
  title,
  cancelText,
  confirmText,
  showTwoButton = true,
  containerSize = "medium",
  className,
  containerSelector,
}) => {
  const { t } = useTranslation("common");

  const newtitle = title || t("buttons-title.delete-modal-title");
  const newConfirmText = confirmText || t("buttons-title.confirm-delete-btn");
  const newCancelText = cancelText || t("buttons-title.cancel-delete-btn");

  const currentSize =
    containerSize && sizeMap[containerSize] ? containerSize : "medium";

  // Якщо селектор передано, шукаємо цей елемент, інакше — document.body
  const targetContainer = containerSelector
    ? document.querySelector(containerSelector)
    : document.querySelector("#app_root");

  const modalHTML = (
    <div
      onClick={onClose}
      className={clsx(
        styles.overlay,
        // Якщо селектора НЕМАЄ, робимо модалку глобальною (на весь екран)
        !containerSelector ? styles.global : styles.local,
      )}
    >
      <div
        className={clsx(styles.modal, styles[containerSize], className)}
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
              {...sizeMap[currentSize]}
            />
          )}
          <Button
            title={newCancelText}
            onClick={onClose}
            className={styles.btn}
            buttonStyle={ButtonStyles.OUTLINE}
            {...sizeMap[currentSize]}
          />
        </div>
      </div>
    </div>
  );

  // Рендеримо через портал у знайдений контейнер (або body для страховки)
  return createPortal(modalHTML, targetContainer || document.body);
};

export default ConfirmModal;
