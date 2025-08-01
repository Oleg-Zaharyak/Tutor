import styles from "./styles.module.scss";

const Calendar = () => {
  return (
    <ul className={styles.container}>
      <li>Тут можна буде подивитись свої зустрічі</li>
      <li>Спланувати нові зучстрічі</li>
      <li>
        Редагувати, видаляти , додавати учнів, файли , посилання і так далі
      </li>
    </ul>
  );
};

export default Calendar;
