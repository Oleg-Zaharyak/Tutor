import { FC } from "react";
import styles from "./styles.module.scss";
import Button from "../Button";
import Input from "../Input";
import { Icons } from "../../constants/icons";
import { CreateTaskModalProps } from "./types";

const CreateTaskModal: FC<CreateTaskModalProps> = ({ onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <Icons.cross onClick={onClose} className={styles.modal_btns_close} />
        <h1 className={styles.modal_title}>Create new Task</h1>
        <form
          className={styles.modal_form}
          onSubmit={(e) => e.preventDefault()}
        >
          <Input name="title" title="Title" inputSize="medium" />
          <Input name="description" title="Description" inputSize="medium" />
          <Button type="submit" medium title="Create" />
        </form>
      </div>
    </div>
  );
};
export default CreateTaskModal;
