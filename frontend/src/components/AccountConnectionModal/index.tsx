import { FC, useState } from "react";
import styles from "./styles.module.scss";
import { AccountConnectionModalProps } from "./types";
import Button from "../Button";
import Input from "../Input";
import { RxCross2 } from "react-icons/rx";

const AccountConnectionModal: FC<AccountConnectionModalProps> = ({
  title,
  btnTitle,
  onClose,
  onConfirm,
}) => {
  const [email, setEmail] = useState("");

  const handleConfirm = () => {
    if (!email) return;
    onConfirm(email);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <RxCross2 onClick={onClose} className={styles.modal_btns_close} />
        <h1 className={styles.modal_title}>{title}</h1>
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          title="Email"
          inputSize="medium"
          placeholder="Enter email"
        />
        <Button size="medium" title={btnTitle} onClick={handleConfirm} />
      </div>
    </div>
  );
};
export default AccountConnectionModal;
