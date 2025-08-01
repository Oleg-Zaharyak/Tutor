import styles from "./styles.module.scss";

export const Whiteboards = () => {
  return (
    <ul className={styles.container}>
      <li>Тут буде список активних дощок</li>
      <li>До кожної дошки можна уде прикріпити учня або учнів</li>
      <li>Можна буде створювати нові</li>
    </ul>
  );
};
export default Whiteboards;
