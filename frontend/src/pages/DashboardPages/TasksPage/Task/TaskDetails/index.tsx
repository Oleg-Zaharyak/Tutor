// import { useParams } from "react-router-dom";
import ActionToolbar from "../../../../../components/ActionToolbar";
import { ButtonStyles } from "../../../../../components/Button/types";
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";
import { Icons } from "../../../../../constants/icons";
import { useState } from "react";
import ConfirmModal from "../../../../../components/ConfirmModal";
import TaskHeader from "./TaskHeader";

const TaskDetails = () => {
  // const { taskId } = useParams<{ taskId: string }>();
  const { t } = useTranslation(["tasks", "common"]);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const actionButtons = [
    {
      title: t("buttons-title.add-question-btn"),
      onClick: () => {},
      buttonStyle: ButtonStyles.OUTLINE,
      Icon: Icons.plus,
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
        <TaskHeader />
        <div className={styles.task_content}>
          <div className={styles.block}>
            <p>Some text</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className={styles.block}>
            <p>Some text</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className={styles.block}>
            <p>Some text</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className={styles.block}>
            <p>Some text</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className={styles.block}>
            <p>Some text</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className={styles.block}>
            <p>Some text</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className={styles.block}>
            <p>Some text</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className={styles.block}>
            <p>Some text</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
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
    </div>
  );
};

export default TaskDetails;


