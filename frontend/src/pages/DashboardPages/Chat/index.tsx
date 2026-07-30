import ActionToolbar from "../../../components/ActionToolbar";
import styles from "./styles.module.scss";

const Chat = () => {
  return (
    <div className={styles.container}>
      <ActionToolbar title="Чати"/>
      <p>Тут можна буде переписуватись з наявними учнями</p>
    </div>
  );
};

export default Chat;
