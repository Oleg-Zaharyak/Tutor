import styles from "./styles.module.scss";

const TaskSkeleton = () => {
  const blockCount = 4;
  return Array.from({ length: blockCount }).map((_, blockIndex) => (
    <div key={blockIndex} className={styles.container} />
  ));
};

export default TaskSkeleton;
