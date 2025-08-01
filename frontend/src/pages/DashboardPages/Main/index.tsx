import { useTranslation } from "react-i18next";
import styles from "./styles.module.scss";

const Main = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.container_header}>{t("menu.title-dashboard")}</div>
      <div className={styles.container_content}>
        Тут буде якийсь глобальний контент і по якому можна буде переходити на
        певні сторінки
      </div>
    </div>
  );
};

export default Main;
