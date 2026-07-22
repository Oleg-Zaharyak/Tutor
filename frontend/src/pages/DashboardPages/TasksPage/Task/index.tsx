import styles from "./styles.module.scss";
import { useNavigate } from "react-router-dom";

type TaskProps = {
  id?: number;
  title?: string;
  description?: string;
};

const Task = ({ id, title, description }: TaskProps) => {
  const navigate = useNavigate();

  const handleOpenTaskDetails = (taskId?: number) => {
    if (taskId) {
      navigate(`/dashboard/tasks/${taskId}`);
    }
  };

  return (
    <div
      onClick={() => handleOpenTaskDetails(id)}
      className={styles.task_container}
    >
      <div className={styles.task_header}>
        <div className={styles.task_title}>{title}</div>
      </div>
      {description && (
        <div className={styles.task_description}>{description}</div>
      )}
    </div>
  );
};

export default Task;
