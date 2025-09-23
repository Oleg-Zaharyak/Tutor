import styles from "./styles.module.scss";

const MenuButtonSkeleton = () => {
  return (
    <>
      {Array.from({ length: 7 }).map((_, index) => (
        <div key={index} className={styles.container}></div>
      ))}
    </>
  );
};

export default MenuButtonSkeleton;
