import { FC } from "react";
import styles from "./styles.module.scss";
import Button from "../Button";

interface ConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
  text: string;
}

const ConfirmModal: FC<ConfirmModalProps> = ({ onClose, onConfirm, text }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <p className={styles.text}>{text}</p>
        <div className={styles.buttons}>
          <Button
            title="Ні"
            styleType="outline"
            onClick={onClose}
            className={styles.btn}
          />
          <Button
            title="Так"
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
