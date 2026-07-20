import { useState } from "react";
import Button from "../../../components/Button";
import { ButtonStyles } from "../../../components/Button/types";
import styles from "./styles.module.scss";
import CreateTaskModal from "../../../components/CreateTaskModal";
import Task from "./Task";
import { useTranslation } from "react-i18next";
import AssignTaskModal from "../../../components/AssignTaskModal";

// const taskList = [
//   {
//     id: 1,
//     title: "Завдання 1",
//     description: "Опис завдання 1",
//   },
// ];

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
          <Task onAssign={handleToggleAssignTaskModal} />
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
