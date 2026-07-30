import { useState } from "react";
import Button from "../../../../../../components/Button";
import { ButtonStyles } from "../../../../../../components/Button/types";
import { Icons } from "../../../../../../constants/icons";
import styles from "./styles.module.scss";
import Input from "../../../../../../components/Input";
import Textarea from "../../../../../../components/Textarea";
type TaskHeaderProps = {
  isEditActive: boolean;
  toggleIsEditActive: (value: boolean) => void;
};
const TaskHeader = ({ isEditActive, toggleIsEditActive }: TaskHeaderProps) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const editButtons = [
    {
      id: "checkBtn",
      medium: true,
      Icon: Icons.check,
      buttonStyle: ButtonStyles.OUTLINE,
    },
    {
      id: "cancelBtn",
      medium: true,
      Icon: Icons.cross,
      buttonStyle: ButtonStyles.WARNING_OUTLINE,
      onClick: () => {
        setIsEditMode(false);
        toggleIsEditActive(!isEditActive);
      },
    },
  ];

  const viewButtons = [
    {
      id: "editBtn",
      small: true,
      Icon: Icons.edit,
      buttonStyle: ButtonStyles.OUTLINE,
      className: styles.edit_btn,
      onClick: () => {
        setIsEditMode(true);
        toggleIsEditActive(!isEditActive);
      },
      disabled: isEditActive,
    },
  ];

  const buttons = isEditMode ? editButtons : viewButtons;

  return (
    <div className={styles.task_header}>
      {isEditMode ? (
        <>
          <Input
            value={"Title"}
            small
            containerClassName={styles.input_container}
            inputClassName={styles.input}
          />
          <Textarea value={"Description"} inputClassName={styles.textarea} />
        </>
      ) : (
        <>
          <div className={styles.task_header_title}>Title</div>
          <div className={styles.task_header_description}>Description</div>
        </>
      )}

      <div className={styles.buttons}>
        {buttons?.map((btn) => (
          <Button
            key={btn.id}
            showOnlyIcon
            style={isEditMode ? { padding: "6px", width: "36px" } : undefined}
            {...btn}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskHeader;
