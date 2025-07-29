import styles from "./styles.module.scss";

const Loader = () => {
  return (
    <div className={styles.loaderBackdrop}>
      <div className={styles.spinner} />
    </div>
  );
};

export default Loader;
