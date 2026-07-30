import { FC, useState } from "react";
import styles from "./styles.module.scss";

import { AddNewQuestionModalProps } from "./types";
import { Icons } from "../../../../../../constants/icons";
import Button from "../../../../../../components/Button";

const types = [
  { id: "1", name: "Default" },
  { id: "2", name: "Custom" },
];

const AddNewQuestionModal: FC<AddNewQuestionModalProps> = ({ onClose }) => {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handleAssign = () => {
    console.log({
      itemId: selectedItemId,
    });

    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <Icons.cross onClick={onClose} className={styles.modal_btns_close} />
        <h1 className={styles.modal_title}>{"Select question type"}</h1>

        <div className={styles.modal_types_list}>
          {types.map((type) => {
            return (
              <label key={type.id} className={styles.type}>
                <input
                  type="radio"
                  name="question-type"
                  onChange={() => setSelectedItemId(type.name)}
                />

                <div className={styles.types_name}>{type.name}</div>
              </label>
            );
          })}
        </div>
        <Button
          medium
          title="Confirm"
          onClick={handleAssign}
          disabled={!selectedItemId}
        />
      </div>
    </div>
  );
};

export default AddNewQuestionModal;
