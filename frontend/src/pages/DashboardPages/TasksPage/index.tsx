import { useState } from "react";
import Button from "../../../components/Button";
import { ButtonStyles } from "../../../components/Button/types";
import styles from "./styles.module.scss";
import CreateTaskModal from "../../../components/CreateTaskModal";
import Task from "./Task";

const TasksPage = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleToggleModal = () => {
    setIsOpenModal((prev) => !prev);
  };
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {/* <h1 className={styles.header_text}>{t("title", { ns: "tasks" })}</h1>, */}
        <h1 className={styles.header_text}>Завдання</h1>
        <Button
          onClick={handleToggleModal}
          // title={t("add-btn-title", { ns: "students" })}
          title="Створити завдання"
          buttonStyle={ButtonStyles.OUTLINE}
          medium
        />
      </div>
      <div className={styles.content}>
        <div className={styles.content_grid}>
          <Task />
        </div>

        {/* <div className={styles.content_empty}>
          <div className={styles.content_empty_text}>
            {/* {t("no-data", { ns: "common" })}
            Нема даних
          </div>
        </div>  */}
      </div>
      {isOpenModal && <CreateTaskModal onClose={handleToggleModal} />}
    </div>
  );
};

export default TasksPage;
