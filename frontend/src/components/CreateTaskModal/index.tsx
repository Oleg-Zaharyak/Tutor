import { FC } from "react";
import styles from "./styles.module.scss";
import Button from "../Button";
import Input from "../Input";
import { Icons } from "../../constants/icons";
import { CreateTaskModalProps } from "./types";
import { useTranslation } from "react-i18next";

const CreateTaskModal: FC<CreateTaskModalProps> = ({ onClose }) => {
  const { t } = useTranslation("tasks");
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <Icons.cross onClick={onClose} className={styles.modal_btns_close} />
        <h1 className={styles.modal_title}>{t("modal.title")}</h1>
        <form
          className={styles.modal_form}
          onSubmit={(e) => e.preventDefault()}
        >
          <Input name="title" title={t("modal.name")} inputSize="medium" />
          <Input
            name="description"
            title={t("modal.description")}
            inputSize="medium"
          />
          <Button type="submit" medium title={t("modal.submit-btn-title")} />
        </form>
      </div>
    </div>
  );
};
export default CreateTaskModal;
