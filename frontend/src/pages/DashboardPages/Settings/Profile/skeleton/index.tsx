import styles from "./styles.module.scss";

export const MainUserInfoSkeleton = () => {
  return (
    <div className={styles.user}>
      <div className={styles.user_avatar}></div>
      <div className={styles.user_field}>
        <div className={styles.user_field_block}></div>
        <div className={styles.user_field_block}></div>
      </div>
    </div>
  );
};

export const CreatedAtSkeleton = () => (
  <div className={styles.created_at}></div>
);
