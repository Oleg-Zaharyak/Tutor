import { useState } from "react";
import { ButtonStyles } from "../../../components/Button/types";
import styles from "./styles.module.scss";
import CreateTaskModal from "../../../components/CreateTaskModal";
import Task from "./Task";
import { useTranslation } from "react-i18next";
import ActionToolbar from "../../../components/ActionToolbar";

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

  const handleToggleModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  const headerButtons = [
    {
      onClick: handleToggleModal,
      title: t("add-btn-title"),
      buttonStyle: ButtonStyles.OUTLINE,
      medium: true,
    },
  ];

  return (
    <div className={styles.container}>
      <ActionToolbar buttons={headerButtons} title={t("title")} />
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
      </div>
      {isOpenModal && <CreateTaskModal onClose={handleToggleModal} />}
    </div>
  );
};

export default TasksPage;
