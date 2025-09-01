import { FC } from "react";
import styles from "./styles.module.scss";
import Button from "../Button";

interface ConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  title: string;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  onClose,
  onConfirm,
  title,
  cancelText = "No",
  confirmText = "Yes",
}) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <p className={styles.text}>{title}</p>
        <div className={styles.buttons}>
          <Button
            title={cancelText}
            styleType="outline"
            onClick={onClose}
            className={styles.btn}
          />
          <Button
            title={confirmText}
            styleType="outline"
            onClick={onConfirm}
            className={styles.btn}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
