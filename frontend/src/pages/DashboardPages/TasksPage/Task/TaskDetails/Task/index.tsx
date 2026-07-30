import { useState } from "react";
import { ButtonStyles } from "../../../../../../components/Button/types";
import { Icons } from "../../../../../../constants/icons";
import styles from "./styles.module.scss";
import Button from "../../../../../../components/Button";
import Input from "../../../../../../components/Input";
import Textarea from "../../../../../../components/Textarea";
import ConfirmModal from "../../../../../../components/ConfirmModal";

type QuestionProps = {
  index?: number;
  question: { id: string; title: string; ansver: string };
  isEditActive: boolean;
  toggleIsEditActive: (value: boolean) => void;
};

const Question = ({
  index,
  question,
  isEditActive,
  toggleIsEditActive,
}: QuestionProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const editButtons = [
    {
      id: "questionCheckBtn",
      Icon: Icons.check,
      buttonStyle: ButtonStyles.OUTLINE,
      small: true,
    },
    {
      id: "questionCancelBtn",
      Icon: Icons.cross,
      buttonStyle: ButtonStyles.WARNING_OUTLINE,
      onClick: () => {
        setIsEditMode(false);
        toggleIsEditActive(!isEditActive);
      },
      small: true,
    },
  ];

  const viewButtons = [
    {
      id: "questionEditBtn",
      small: true,
      Icon: Icons.edit,
      buttonStyle: ButtonStyles.OUTLINE,
      className: styles.edit_btn,
      onClick: () => {
        setIsEditMode(true);
        toggleIsEditActive(!isEditActive);
      },
      disabled: isEditActive,
      defaultTooltipText: "Some task is not saved",
    },
    {
      id: "questionDeleteBtn",
      Icon: Icons.delete,
      buttonStyle: ButtonStyles.WARNING_OUTLINE,
      onClick: () => setIsDeleteModalOpen(true),
      small: true,
    },
  ];

  const buttons = isEditMode ? editButtons : viewButtons;

  return (
    <div id={question.id} className={styles.container}>
      <div className={styles.header}>
        <div className={styles.header_title}>Question {index}</div>
        <div className={styles.header_btn}>
          {buttons?.map((btn, index) => (
            <Button key={btn.id + index} showOnlyIcon {...btn} />
          ))}
        </div>
      </div>
      <div className={styles.question}>
        {isEditMode ? (
          <Textarea inputClassName={styles.question_textarea} />
        ) : (
          <div className={styles.question_text}>{question.title}</div>
        )}
      </div>

      <div className={styles.ansver}>
        <div className={styles.ansver_title}>Відповідь:</div>
        {isEditMode ? (
          <Input small inputClassName={styles.ansver_input} />
        ) : (
          <div className={styles.ansver_text}>{question.ansver}</div>
        )}
      </div>

      {isDeleteModalOpen && (
        <ConfirmModal
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => {
            console.log("Delete");
            setIsDeleteModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default Question;
