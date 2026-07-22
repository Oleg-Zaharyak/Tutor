import { useState } from "react";
import Button from "../../../components/Button";
import { ButtonStyles } from "../../../components/Button/types";
import styles from "./styles.module.scss";
import CreateTaskModal from "../../../components/CreateTaskModal";
import Task from "./Task";
import { useTranslation } from "react-i18next";
import AssignTaskModal from "../../../components/AssignTaskModal";

const tasks = [
  {
    id: 1,
    title: "Завдання 1",
    description: "Опис завдання 1",
  },
  {
    id: 2,
    title: "Завдання 2",
    description: "Опис завдання 2",
  },
  {
    id: 3,
    title: "Завдання 3",
    description: "Опис завдання 3",
  },
];

const TasksPage = () => {
  const { t } = useTranslation("tasks");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isAssignTaskModalOpen, setIsAssignTaskModalOpen] = useState(false);
  const handleToggleModal = () => {
    setIsOpenModal((prev) => !prev);
  };
  const handleToggleAssignTaskModal = () => {
    setIsAssignTaskModalOpen((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.header_text}>{t("title")}</h1>
        <Button
          onClick={handleToggleModal}
          title={t("add-btn-title")}
          buttonStyle={ButtonStyles.OUTLINE}
          medium
        />
      </div>
      <div className={styles.content}>
        <div className={styles.content_grid}>
          {tasks.map((task: (typeof tasks)[0]) => (
            <Task
              key={task.id}
              title={task.title}
              description={task.description}
              id={task.id}
            />
          ))}
        </div>

        {/* <div className={styles.content_empty}>
          <div className={styles.content_empty_text}>
            {/* {t("no-data", { ns: "common" })}
            Нема даних
          </div>
        </div>  */}
      </div>
      {isOpenModal && <CreateTaskModal onClose={handleToggleModal} />}
      {isAssignTaskModalOpen && (
        <AssignTaskModal onClose={handleToggleAssignTaskModal} />
      )}
    </div>
  );
};

export default TasksPage;
