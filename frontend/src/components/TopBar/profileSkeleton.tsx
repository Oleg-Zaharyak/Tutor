import styles from "./styles.module.scss";

const ProfileSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeleton_img}></div>
      <div className={styles.skeleton_block}>
        <div className={styles.skeleton_block_text}></div>
        <div className={styles.skeleton_block_role}></div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
