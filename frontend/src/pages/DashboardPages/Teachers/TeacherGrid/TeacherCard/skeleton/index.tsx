import styles from "./styles.module.scss";

export const TeacherCardSkeleton = () => {
  const blockCount = 8;
  return Array.from({ length: blockCount }).map((_, blockIndex) => (
    <div key={blockIndex} className={styles.skeleton_block} />
  ));
};
