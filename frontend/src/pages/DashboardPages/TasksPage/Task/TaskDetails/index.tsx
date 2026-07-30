// import { useParams } from "react-router-dom";
import ActionToolbar from "../../../../../components/ActionToolbar";
import { ButtonStyles } from "../../../../../components/Button/types";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { Icons } from "../../../../../constants/icons";
import { useState } from "react";
import ConfirmModal from "../../../../../components/ConfirmModal";
import TaskHeader from "./TaskHeader";
import Question from "./Task";
import AssignTaskModal from "./AssignTaskModal";
import AddNewQuestionModal from "./AddNewQuestionModal";

const questions = [
  {
    id: "someId1",
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, dolorum! Placeat tenetur, magnam quidem praesentium iure saepe doloremque, voluptas a, inventore eligendi commodi optio! Esse vitae expedita rem dolore harum! ",
    ansver: "some",
  },
  {
    id: "someId2",
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, dolorum! Placeat tenetur, magnam quidem praesentium iure saepe doloremque, voluptas a, inventore eligendi commodi optio! Esse vitae expedita rem dolore harum!",
    ansver: "some2",
  },
  {
    id: "someId3",
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, dolorum! Placeat tenetur, magnam quidem praesentium iure saepe doloremque, voluptas a, inventore eligendi commodi optio! Esse vitae expedita rem dolore harum!",
    ansver: "some3",
  },
];

const TaskDetails = () => {
  // const { taskId } = useParams<{ taskId: string }>();
  const { t } = useTranslation(["tasks", "common"]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditActive, setIsEditActive] = useState(false);
  const [isAssignTaskModalOpen, setIsAssignTaskModalOpen] = useState(false);
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);

  const toggleAssignTaskModal = () => {
    setIsAssignTaskModalOpen((prev) => !prev);
  };

  const toggleAddQuestionModalOpen = () => {
    setIsAddQuestionModalOpen(false);
  };

  const actionButtons = [
    {
      title: t("buttons-title.add-question-btn"),
      onClick: () => setIsAddQuestionModalOpen(true),
      buttonStyle: ButtonStyles.OUTLINE,
      Icon: Icons.plus,
      collapseTextToIcon: true,
    },
    {
      title: t("buttons-title.assign-btn"),
      onClick: () => setIsAssignTaskModalOpen(true),
      buttonStyle: ButtonStyles.OUTLINE,
      Icon: Icons.addPerson,
      collapseTextToIcon: true,
    },
    {
      title: t("common:buttons-title.delete-btn"),
      Icon: Icons.delete,
      onClick: () => setIsDeleteModalOpen(true),
      buttonStyle: ButtonStyles.WARNING_OUTLINE,
      collapseTextToIcon: true,
    },
  ];

  return (
    <div className={styles.container}>
      <ActionToolbar buttons={actionButtons} />
      <div className={styles.task}>
        <TaskHeader
          isEditActive={isEditActive}
          toggleIsEditActive={setIsEditActive}
        />
        <div className={styles.task_content}>
          {questions.map((question, index) => (
            <Question
              isEditActive={isEditActive}
              toggleIsEditActive={setIsEditActive}
              index={index + 1}
              key={question.id}
              question={question}
            />
          ))}
        </div>
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
      {isAssignTaskModalOpen && (
        <AssignTaskModal onClose={toggleAssignTaskModal} />
      )}
      {isAddQuestionModalOpen && (
        <AddNewQuestionModal onClose={toggleAddQuestionModalOpen} />
      )}
    </div>
  );
};

export default TaskDetails;
