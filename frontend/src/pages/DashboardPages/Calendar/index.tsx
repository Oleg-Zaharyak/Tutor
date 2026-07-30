import ActionToolbar from "../../../components/ActionToolbar";
import styles from "./styles.module.scss";

const Calendar = () => {
  return (
    <div className={styles.container}>
      <ActionToolbar title="Календар" />
      <p>Тут можна буде подивитись свої зустрічі</p>
      <p>Спланувати нові зучстрічі</p>
      <p>Редагувати, видаляти , додавати учнів, файли , посилання і так далі</p>
    </div>
  );
};

export default Calendar;
